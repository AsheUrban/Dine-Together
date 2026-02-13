import { auth } from '../firebase.js';
import { db } from '../firebase.js';
import { collection, doc, updateDoc, query, orderBy, where, onSnapshot, getDoc, writeBatch, serverTimestamp, getDocs, setDoc, limit } from 'firebase/firestore';
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
            const postPromises = querySnapshot.docs.map(docSnapshot => {
                const postData = docSnapshot.data();
                const timeOpen = docSnapshot.get('timeOpen', {serverTimestamps: "estimate"}).toDate();
                return getDoc(doc(db, 'places', postData.placeId)).then(placeDoc => ({
                    postData,
                    postId: docSnapshot.id,
                    timeOpen: new Date(timeOpen),
                    placeDoc
                }));
            });

            const results = await Promise.all(postPromises);
            const posts = results
                .filter(({ placeDoc }) => placeDoc.exists())
                .map(({ postData, postId, timeOpen, placeDoc }) => ({
                    userId: postData.userId,
                    authorUsername: postData.authorUsername,
                    caption: postData.caption,
                    placeId: postData.placeId,
                    timeOpen: timeOpen,
                    formattedWaitTime: formatDistanceToNow(timeOpen),
                    id: postId,
                    restaurantName: placeDoc.data().restaurantName,
                    restaurantAddress: placeDoc.data().restaurantAddress,
                    priceLevel: placeDoc.data().priceLevel,
                    rating: placeDoc.data().rating,
                    userRatingsTotal: placeDoc.data().userRatingsTotal,
                    photoReferences: placeDoc.data().photoReferences
                }));
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
           const postPromises = querySnapshot.docs.map(docSnapshot => {
                const postData = docSnapshot.data();
                const timeOpen = docSnapshot.get('timeOpen', {serverTimestamps: "estimate"}).toDate();
                return getDoc(doc(db, 'places', postData.placeId)).then(placeDoc => ({
                    postData,
                    postId: docSnapshot.id,
                    timeOpen: new Date(timeOpen),
                    placeDoc
                }));
            });

            const results = await Promise.all(postPromises);
            const posts = results
                .filter(({ placeDoc }) => placeDoc.exists())
                .map(({ postData, postId, timeOpen, placeDoc }) => ({
                    userId: postData.userId,
                    authorUsername: postData.authorUsername,
                    caption: postData.caption,
                    placeId: postData.placeId,
                    timeOpen: timeOpen,
                    formattedWaitTime: formatDistanceToNow(timeOpen),
                    id: postId,
                    restaurantName: placeDoc.data().restaurantName,
                    restaurantAddress: placeDoc.data().restaurantAddress,
                    priceLevel: placeDoc.data().priceLevel,
                    rating: placeDoc.data().rating,
                    userRatingsTotal: placeDoc.data().userRatingsTotal,
                    photoReferences: placeDoc.data().photoReferences
                }));
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
            const placePromises = querySnapshot.docs.map(docSnapshot => {
                const placeId = docSnapshot.id;
                const timeAdded = docSnapshot.get('timeAdded', {serverTimestamps: "estimate"}).toDate();
                return getDoc(doc(db, 'places', placeId)).then(placeDoc => ({
                    placeDoc,
                    timeAdded: new Date(timeAdded)
                }));
            });

            const results = await Promise.all(placePromises);
            const places = results
                .filter(({ placeDoc }) => placeDoc.exists())
                .map(({ placeDoc, timeAdded }) => ({
                        ...placeDoc.data(),
                        id: placeDoc.id,
                        timeOpen: timeAdded
                    }));
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

// ===== PLACE LOOKUP =====

export const findPlaceByGoogleId = async (googlePlaceId) => {
    const q = query(
        collection(db, 'places'),
        where('googlePlaceId', '==', googlePlaceId),
        limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return null;
    }

    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};

export const getPlaceById = async (placeId) => {
    const docRef = doc(db, 'places', placeId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        return null;
    }

    return { id: docSnap.id, ...docSnap.data() };
};

export const createPlace = async (placeData) => {
    const placeRef = doc(collection(db, 'places'));
    await setDoc(placeRef, {
        ...placeData,
        createdAt: serverTimestamp()
    });
    return { id: placeRef.id, ...placeData};
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

export const createUserProfile = async (userId, profileData) => {
    const userRef = doc(db, 'users', userId);
    return await setDoc(userRef, {
        ...profileData,
        createdAt: serverTimestamp()
    });
};