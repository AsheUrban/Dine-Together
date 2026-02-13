import { useState, useEffect } from 'react';
import { subscribeToUserPosts } from '../services/firebaseService';

export const useUserPosts = (userId) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const unSubscribe = subscribeToUserPosts(
            userId,
            (postData) => {
                setPosts(postData);
                setLoading(false);
            },
            (errorMessage) => {
                setError(errorMessage);
                setLoading(false);
            },
        );

        return () => unSubscribe();
    }, [userId]);

    return { posts, loading, error };
};
