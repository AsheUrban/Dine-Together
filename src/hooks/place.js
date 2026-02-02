import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './../firebase.js';

export const usePlace = (placeId) => {
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!placeId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const unsubscribe = onSnapshot(
            doc(db, 'places', placeId),
            (snapshot) => {
                if (snapshot.exists()) {
                    setPlace({ id: snapshot.id, ...snapshot.data() });
                    setError(null);
                } else {
                    setError('Place not found');
                }
                setLoading(false);
            },
            (err) => {
                setError('Error loading place');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [placeId]);

    return {
        place,
        loading,
        error,
    };
};