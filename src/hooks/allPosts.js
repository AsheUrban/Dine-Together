import { useState, useEffect } from 'react';
import { subscribeToAllPlaces } from '../services/firebaseService.js';

export const useAllPosts = () => {
    const [posts, setPosts]= useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
    const unSubscribe = subscribeToAllPlaces(
        (places) => setPosts(places),
        (errorMessage) => setError(errorMessage)
    );
    return () => unSubscribe();
    }, []);

    return {
    posts,
    error
    }
}