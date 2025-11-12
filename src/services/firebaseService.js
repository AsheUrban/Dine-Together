import { collection, addDoc, doc, updateDoc, deleteDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';
import { formatDistanceToNow } from 'date-fns';

export const subscribeToPosts = (onPostUpdate, onError) => {
    const queryByTimestamp = query(
        collection(db, "posts"),
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
                    names: doc.data().names,
                    location: doc.data().location,
                    issue: doc.data().issue,
                    timeOpen: jsDate,
                    formattedWaitTime: formatDistanceToNow(jsDate),
                    id: doc.id
                });
            });
            onPostUpdate(posts);
        },
        (error) => {
            onError(error.message);
        }
    );

    return unSubscribe;
};

export const addNewPost = async (postData) => {
    const collectionRef = collection(db, 'posts');
    return await addDoc(collectionRef, postData);
};

export const updatePost = async (postToEdit) => {
    const {id, ...dataToUpdate } = postToEdit;
    const postRef = doc(db, 'posts', id);
    return await updateDoc(postRef, dataToUpdate);
};

export const deletePost = async (id) => {
    return await deleteDoc(doc(db, 'posts', id));
};

export const updatePostElapsedWaitTimes = (posts) => {
    return posts.map(post => {
        const newFormattedWaitTime = formatDistanceToNow(post.timeOpen);
        return {...post, formattedWaitTime: newFormattedWaitTime};
    });
};
         