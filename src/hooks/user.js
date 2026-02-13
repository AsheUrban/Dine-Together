import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './../firebase.js';

export const useUser = (userId) => {
    const [username, setUsername] = useState(null);
    const [userBio, setUserBio] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const unsubscribe = onSnapshot(
            doc(db, 'users', userId),
            (snapshot) => {
                if (snapshot.exists()) {
                    setUsername(snapshot.data().username);
                    setUserBio(snapshot.data());
                    setError(null);
                } else {
                    setError('User not found');
                }
                setLoading(false);
            },
            (err) => {
                setError('Error loading profile');
                setLoading(false);
            },
        );

        return () => unsubscribe();
    }, [userId]);

    return {
        username,
        userBio,
        loading,
        error,
    };
};
