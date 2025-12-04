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
            for(const docSnapShot of querySnapshot.docs) {
                const timeOpen = docSnapShot.get('timeOpen', {serverTimestamps: "estimate"}).toDate();
                const jsDate = new Date(timeOpen);
                const placeDoc = await getDoc(doc(db, 'places', docSnapShot.data().placeId));
                if(placeDoc.exists()) {
                    posts.push({
                        userId: docSnapShot.data().userId,
                        authorUsername: docSnapShot.data().authorUsername,
                        caption: docSnapShot.data().caption,
                        placeId: docSnapShot.data().placeId,
                        timeOpen: jsDate,
                        formattedWaitTime: formatDistanceToNow(jsDate),
                        id: docSnapShot.id,
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
            for (const docSnapshot of querySnapshot.docs) {
                const timeOpen = docSnapshot.get('timeOpen', {serverTimestamps: "estimate"}).toDate();
                const jsDate = new Date(timeOpen);
                const placeDoc = await getDoc(doc(db, 'places', docSnapshot.data().placeId));
                if(placeDoc.exists()) {
                    posts.push({
                        userId: docSnapshot.data().userId,
                        authorUsername: docSnapshot.data().authorUsername,
                        caption: docSnapshot.data().caption,
                        placeId: docSnapshot.data().placeId,
                        timeOpen: jsDate,
                        formattedWaitTime: formatDistanceToNow(jsDate),
                        id: docSnapshot.id,
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
        collection(db, "users", userId, "userPlaces"),
        orderBy('timeAdded', 'desc')
    );

    const unSubscribe = onSnapshot (
        queryUserPlaces,
        async (querySnapshot) => {
            const places = [];
            for (const docSnapshot of querySnapshot.docs) {
                const placeId = docSnapshot.id;
                const timeAdded = docSnapshot.get('timeAdded', {serverTimestamps: "estimate"}).toDate();
                const jsDate = new Date(timeAdded);
                const placeDoc = await getDoc(doc(db, 'places', placeId));
                if(placeDoc.exists()) {
                    places.push({
                        ...placeDoc.data(),
                        id: placeDoc.id,
                        timeOpen: jsDate
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

export const addToSavedPlaces = async (userId, placeId) => {
    const batch = writeBatch(db);

    try {
        const placeSavedByRef = doc(db, 'placeSavedBy', placeId, 'users', userId);
        batch.set(placeSavedByRef, {
            timeAdded: serverTimestamp()
        });

        const userPlaceRef = doc(db, 'users', userId, 'userPlaces', placeId);
        batch.set(userPlaceRef, {
            timeAdded: serverTimestamp()
        });

        await batch.commit();
    } catch (error) {
        console.error('Error adding place to saved:', error);
        throw error;
    }
};

export const checkIfPlaceSaved = async (userId, placeId) => {
    try {
        const docRef = doc(db, 'placeSavedBy', placeId, 'users', userId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    } catch (error) {
        console.error('Error checking if place saved:', error);
        return false;
    }
};

export const getPlaceSavedByUsers = async (placeId) => {
    try {
        const usersRef = collection(db, 'placeSavedBy', placeId, 'users');
        const snapshot = await getDocs(usersRef);
        return snapshot.docs.map(doc => doc.id);
    } catch (error) {
        console.error('Error fetching place saved by users:', error);
        return [];
    }
};

export const getUsernamesFromIds = async (userIds) => {
    try {
        const usernames = {};
        for(const userId of userIds) {
            const userRef = doc(db, 'users', userId);
            const usersnap = await getDoc(userRef);
            if (usersnap.exists()) {
                usernames[userId] = usersnap.data().username;
            } 
        }
        return usernames;
    } catch (error) {
        return {};
    }
};

export const removeFromSavedPlaces = async (userId, placeId) => {
    const batch = writeBatch(db);

    try {
        const placeSavedByRef = doc(db, 'placeSavedBy', placeId, 'users', userId);
        batch.delete(placeSavedByRef);
        
        const userPlaceRef = doc(db, 'users', userId, 'userPlaces', placeId);
        batch.delete(userPlaceRef);

        await batch.commit();
    } catch (error) {
        console.error('Error removing place from saved:', error);
        throw error;
    }
};

export const updatePlace = async (placeId, placeData) => {
    const placeRef = doc(db, 'places', placeId);
    return await updateDoc(placeRef, placeData);
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