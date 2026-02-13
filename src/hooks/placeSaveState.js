import { useState, useEffect } from 'react';
import { auth } from '../firebase.js';
import {
    checkIfPlaceSaved,
    getPlaceSavedByUsers,
    getUsernamesFromIds,
    addToSavedPlaces,
} from '../services/firebaseService';

export const usePlaceSaveState = (placeId) => {
    const [isSaved, setIsSaved] = useState(null);
    const [savedByUsers, setSavedByUsers] = useState([]);
    const [savedByUsernames, setSavedByUsernames] = useState({});
    const [showAllSavedBy, setShowAllSavedBy] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadSavedByInfo = async () => {
            setIsLoading(true);
            try {
                const saved = await checkIfPlaceSaved(
                    auth.currentUser.uid,
                    placeId,
                );
                setIsSaved(saved);

                const userIds = await getPlaceSavedByUsers(placeId);
                const otherUserIds = userIds.filter(
                    (id) => id !== auth.currentUser.uid,
                );
                setSavedByUsers(otherUserIds);

                if (otherUserIds.length > 0) {
                    const usernames = await getUsernamesFromIds(otherUserIds);
                    setSavedByUsernames(usernames);
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (placeId) {
            loadSavedByInfo();
        }
    }, [placeId]);

    const savePlace = async () => {
        try {
            setIsLoading(true);
            await addToSavedPlaces(auth.currentUser.uid, placeId);
            setIsSaved(true);
            const userIds = await getPlaceSavedByUsers(placeId);
            const otherUserIds = userIds.filter(
                (id) => id !== auth.currentUser.uid,
            );
            setSavedByUsers(otherUserIds);
            if (otherUserIds.length > 0) {
                const usernames = await getUsernamesFromIds(otherUserIds);
                setSavedByUsernames(usernames);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isSaved,
        savedByUsers,
        savedByUsernames,
        showAllSavedBy,
        setShowAllSavedBy,
        isLoading,
        savePlace,
    };
};
