import { useState, useEffect } from 'react';
import { auth } from './../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase.js';

export const useProfileData = () => {
    const [username, setUsername] = useState(null);
    const [userBio, setUserBio] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
            const fetchUserProfile = async () => {
                try {
                    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
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
    
        fetchUserProfile();
    }, []);

    return {
        username,
        userBio,
        loading,
        error
    }
}