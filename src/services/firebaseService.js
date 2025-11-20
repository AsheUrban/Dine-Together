import { collection, addDoc, doc, updateDoc, deleteDoc, query, orderBy, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';
import { formatDistanceToNow } from 'date-fns';

export const subscribeToPlaces = (userId, onPlaceUpdate, onError) => {
    const queryByTimestamp = query(
        collection(db, "posts"),
        where('userId', '==', userId),
        orderBy('timeOpen')
    );

    const unSubscribe = onSnapshot (
        queryByTimestamp,
        (querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                const timeOpen = doc.get('timeOpen', {serverTimestamps: "estimate"}).toDate();
                const jsDate = new Date(timeOpen);
                posts.push({
                    restaurantName: doc.data().restaurantName,
                    restaurantAddress: doc.data().restaurantAddress,
                    notes: doc.data().notes,
                    userId: doc.data().userId,
                    timeOpen: jsDate,
                    formattedWaitTime: formatDistanceToNow(jsDate),
                    id: doc.id
                });
            });
            onPlaceUpdate(posts);
        },
        (error) => {
            onError(error.message);
        }
    );

    return unSubscribe;
};

export const addNewPlace = async (placeData) => {
    const collectionRef = collection(db, 'posts');
    return await addDoc(collectionRef, placeData);
};

export const subscribeToAllPlaces = (onPlaceUpdate, onError) => {
    const queryAllPosts = query(
        collection(db, "posts"),
        orderBy('timeOpen')
    );

    const unSubscribe = onSnapshot (
        queryAllPosts,
        (querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                const timeOpen = doc.get('timeOpen', {serverTimestamps: "estimate"}).toDate();
                const jsDate = new Date(timeOpen);
                posts.push({
                    restaurantName: doc.data().restaurantName,
                    restaurantAddress: doc.data().restaurantAddress,
                    notes: doc.data().notes,
                    userId: doc.data().userId,
                    timeOpen: jsDate,
                    formattedWaitTime: formatDistanceToNow(jsDate),
                    id: doc.id
                });
            });
            onPlaceUpdate(posts);
        },
        (error) => {
            onError(error.message);
    }
    );
    return unSubscribe;
};

export const updatePlace = async (placeToEdit) => {
    const {id, ...dataToUpdate } = placeToEdit;
    const placeRef = doc(db, 'posts', id);
    return await updateDoc(placeRef, dataToUpdate);
};

export const deletePlace = async (id) => {
    return await deleteDoc(doc(db, 'posts', id));
};

export const updatePlaceElapsedWaitTimes = (places) => {
    return places.map(place => {
        const newFormattedWaitTime = formatDistanceToNow(place.timeOpen);
        return {...place, formattedWaitTime: newFormattedWaitTime};
    });
};

export const updateUserBio = async (userId, bioData) => {
    const userRef = doc(db, 'users', userId);
    return await updateDoc(userRef, bioData);
};
         