import { useState, useEffect } from 'react';
import { subscribeToUserPlaces } from '../services/firebaseService';

export const useUserPlaces = (userId) => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const unSubscribe = subscribeToUserPlaces(
            userId,
            (placesData) => {
                setPlaces(placesData);
                setLoading(false);
            },
            (errorMessage) => {
                setError(errorMessage);
                setLoading(false);
            },
        );

        return () => unSubscribe();
    }, [userId]);

    return { places, loading, error };
};
