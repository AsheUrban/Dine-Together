import { useState, useEffect } from 'react';
import {
    subscribeToAllPosts,
    updateElapsedWaitTime,
} from '../services/firebaseService.js';

export const useAllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unSubscribe = subscribeToAllPosts(
            (postData) => {
                setPosts(postData);
                setLoading(false);
            },
            (errorMessage) => setError(errorMessage),
        );
        return () => unSubscribe();
    }, []);

    useEffect(() => {
        function updateTimeStamp() {
            const updatedPosts = updateElapsedWaitTime(posts);
            setPosts(updatedPosts);
        }

        const waitTimeUpdateTimer = setInterval(() => updateTimeStamp(), 60000);

        return function cleanup() {
            clearInterval(waitTimeUpdateTimer);
        };
    }, [posts]);

    return {
        posts,
        error,
        loading,
    };
};
