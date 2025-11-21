import { useState, useEffect } from 'react';
import { subscribeToAllPosts, updateElapsedWaitTime } from '../services/firebaseService.js';

export const useAllPosts = () => {
    const [posts, setPosts]= useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
    const unSubscribe = subscribeToAllPosts(
        (postData) => setPosts(postData),
        (errorMessage) => setError(errorMessage)
    );
    return () => unSubscribe();
    }, []);

    useEffect(() => {
        function updateTimeStamp() {
        const updatedPosts = updateElapsedWaitTime(posts);
        setPosts(updatedPosts);
        }

        const waitTimeUpdateTimer = setInterval(() =>
        updateTimeStamp(),
        60000
        );

        return function cleanup() {
        clearInterval(waitTimeUpdateTimer);
        }
    }, [posts]);

    return {
    posts,
    error
    }
}