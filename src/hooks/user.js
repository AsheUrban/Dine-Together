import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase.js';

export const useUser = (userId) => {
    const [username, setUsername] = useState(null);
    const [userBio, setUserBio] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!userId) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    setUsername(userDoc.data().username);
                    setUserBio(userDoc.data());
                } else {
                    setError('User not found');
                }
            } catch (err) {
                setError('Error loading profile');
            } finally {
                setLoading(false);
            }
        };
    
        fetchUser();
    }, [userId]);

    return {
        username,
        userBio,
        loading,
        error,
    }
}