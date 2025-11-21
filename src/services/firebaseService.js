import { auth } from '../firebase.js';
import { db } from '../firebase.js';
import { collection, doc, updateDoc, query, orderBy, where, onSnapshot, getDoc, writeBatch, serverTimestamp, getDocs } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';


// ===== POSTS SUBSCRIPTIONS =====

export const subscribeToUserPosts = (userId, onPostsUpdate, onError) => {
    const queryByTimestamp = query(
        collection(db, "posts"),
        where('userId', '==', userId),
        orderBy('timeOpen', 'desc')
    );

    const unSubscribe = onSnapshot (
        queryByTimestamp,
        async (querySnapshot) => {
            const posts = [];
            for(const doc of querySnapshot.docs) {
                const timeOpen = doc.get('timeOpen', {serverTimestamps: "estimate"}).toDate();
                const jsDate = new Date(timeOpen);
                const placeDoc = await getDoc(doc(db, 'places', doc.data().placeId));
                if(placeDoc.exists()) {
                    posts.push({
                        userId: doc.data().userId,
                        authorUsername: doc.data().authorUsername,
                        caption: doc.data().caption,
                        placeId: doc.data().placeId,
                        timeOpen: jsDate,
                        formattedWaitTime: formatDistanceToNow(jsDate),
                        id: doc.id,
                        restaurantName: placeDoc.data().restaurantName,
                        restaurantAddress: placeDoc.data().restaurantAddress,
                        notes: placeDoc.data().notes,
                        priceLevel: placeDoc.data().priceLevel,
                        rating: placeDoc.data().rating,
                        userRatingsTotal: placeDoc.data().userRatingsTotal
                    });
                }
            }
            onPostsUpdate(posts);
        },
        (error) => {
            onError(error.message);
        }
    );

    return unSubscribe;
};

export const subscribeToAllPosts = (onPostsUpdate, onError) => {
    const queryAllPosts = query(
        collection(db, "posts"),
        orderBy('timeOpen', 'desc')
    );

    const unSubscribe = onSnapshot (
        queryAllPosts,
        async (querySnapshot) => {
            const posts = [];
            for (const doc of querySnapshot.docs) {
                const timeOpen = doc.get('timeOpen', {serverTimestamps: "estimate"}).toDate();
                const jsDate = new Date(timeOpen);
                const placeDoc = await getDoc(doc(db, 'places', doc.data().placeId));
                if(placeDoc.exists()) {
                    posts.push({
                        userId: doc.data().userId,
                        authorUsername: doc.data().authorUsername,
                        caption: doc.data().caption,
                        placeId: doc.data().placeId,
                        timeOpen: jsDate,
                        formattedWaitTime: formatDistanceToNow(jsDate),
                        id: doc.id,
                        restaurantName: placeDoc.data().restaurantName,
                        restaurantAddress: placeDoc.data().restaurantAddress,
                        notes: placeDoc.data().notes,
                        priceLevel: placeDoc.data().priceLevel,
                        rating: placeDoc.data().rating,
                        userRatingsTotal: placeDoc.data().userRatingsTotal
                    });
                }
            }
            onPostsUpdate(posts);
        },
        (error) => {
            onError(error.message);
    }
    );
    return unSubscribe;
};


// ===== PLACES SUBSCRIPTIONS =====

export const subscribeToUserPlaces = (userId, onPlacesUpdate, onError) => {
    const queryUserPlaces = query(
        collection(db, "userPlaces"),
        where('userId', '==', userId),
        orderBy('timeAdded', 'desc')
    );

    const unSubscribe = onSnapshot (
        queryUserPlaces,
        async (querySnapshot) => {
            const places = [];
            for (const doc of querySnapshot.docs) {
                const placeId = doc.data().placeId;
                const placeDoc = await getDoc(doc(db, 'places', placeId));
                if(placeDoc.exists()) {
                    places.push({
                        ...placeDoc.data(),
                        id: placeDoc.id
                    });
                }
            }
            onPlacesUpdate(places);
        },
        (error) => {
            onError(error.message);
        }
    );
    return unSubscribe;
};

  
// ===== POST OPERATIONS =====

export const createPost = async (postData) => {
    const batch = writeBatch(db);
    const authorUsername = auth.currentUser?.displayName || '';
    const userId = auth.currentUser.uid;

    try {
        const placeRef = doc(collection(db, 'places'));
        batch.set(placeRef, {
            restaurantName: postData.restaurantName,
            restaurantAddress: postData.restaurantAddress,
            notes: postData.notes || '',
            priceLevel: postData.priceLevel || null,
            rating: postData.rating || null,
            userRatingsTotal: postData.userRatingsTotal || null,
            createdAt: serverTimestamp()
         });
         const placeId = placeRef.id;

         const postRef = doc(collection(db, 'posts'));
         batch.set(postRef, {
            userId: userId,
            authorUsername: authorUsername,
            caption: postData.caption || '',
            placeId: placeId,
            timeOpen: serverTimestamp(),
        });

        await batch.commit();
        return { postId: postRef.id, placeId: placeId };
     } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const updatePostCaption = async (postId, caption) => {
    const postRef = doc(db, 'posts', postId);
    return await updateDoc(postRef, { caption });
};

export const deletePost = async (postId, removeFromSavedPlaces = false) => {
    const batch = writeBatch(db);

    try {
        const postDoc = await getDoc(doc(db, 'posts', postId));
        if(!postDoc.exists()) throw new Error('Post not found');

        const placeId = postDoc.data().placeId;

        batch.delete(doc(db, 'posts', postId));

        if(removeFromSavedPlaces) {
            const userPlaceQuery = query (
                collection(db, 'userPlaces'),
                where('userId', '==', auth.currentUser.uid),
                where('placeId', '==', placeId)
            );

            const userPlaceDocs = await getDocs(userPlaceQuery);
            userPlaceDocs.forEach(userPlaceDoc => {
                batch.delete(userPlaceDoc.ref);
            });
        }

        await batch.commit();
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};
  

// ===== PLACE OPERATIONS =====

export const updatePlace = async (placeId, placeData) => {
    const placeRef = doc(db, 'places', placeId);
    return await updateDoc(placeRef, placeData);
};

export const removeFromSavedPlaces = async (userId, placeId) => {
    const userPlaceQuery = query(
        collection(db, 'userPlaces'),
        where('userId', '==', userId),
        where('placeId', '==', placeId)
    );

    const userPlaceDocs = await getDocs(userPlaceQuery);
    const batch = writeBatch(db);
    userPlaceDocs.forEach(doc => {
        batch.delete(doc.ref);
    });

    return batch.commit();
};


// ===== UTILITY FUNCTIONS =====

export const updateElapsedWaitTime = (timestamps) => {
    return timestamps.map(timestamp => {
        const newFormattedWaitTime = formatDistanceToNow(timestamp.timeOpen);
        return { ...timestamp, formattedWaitTime: newFormattedWaitTime };
     });
};

export const updateUserBio = async (userId, bioData) => {
    const userRef = doc(db, 'users', userId);
    return await updateDoc(userRef, bioData);
};