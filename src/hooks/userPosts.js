import { auth } from './../firebase.js';
import { useState, useEffect } from 'react';
import { subscribeToUserPosts } from '../services/firebaseService.js';

export const useUserPosts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
    const unSubscribe = subscribeToUserPosts(
        auth.currentUser.uid,
        (postsData) => setPosts(postsData),
        (errorMessage) => setError(errorMessage)
    );
    return () => unSubscribe();
    }, []);

    return {
    posts,
    error
    }
}