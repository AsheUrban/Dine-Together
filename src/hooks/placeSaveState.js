import { useState, useEffect } from 'react';
import { auth } from '../firebase.js';
import { checkIfPlaceSaved, getPlaceSavedByUsers, getUsernamesFromIds, addToSavedPlaces, removeFromSavedPlaces } from '../services/firebaseService';

export const usePlaceSaveState = (placeId) => {
     const [isSaved, setIsSaved] = useState(false);
        const [savedByUsers, setSavedByUsers] = useState([]);
        const [savedByUsernames, setSavedByUsernames] = useState({});
        const [showAllSavedBy, setShowAllSavedBy] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
    
        useEffect(() => {
            const loadSavedByInfo = async () => {
                setIsLoading(true);
                try {
                    const saved = await checkIfPlaceSaved(auth.currentUser.uid, placeId);
                    setIsSaved(saved);
    
                    const userIds = await getPlaceSavedByUsers(placeId);
                    setSavedByUsers(userIds);
    
                    if (userIds.length > 0) {
                        const usernames = await getUsernamesFromIds(userIds);
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
                setSavedByUsers(userIds);
                const usernames = await getUsernamesFromIds(userIds);
                setSavedByUsernames(usernames);
            } finally {
                setIsLoading(false);
            }
        };

        const removePlace = async () => {
            const confirmed = window.confirm('Remove from saved places?');
            if(confirmed) {
                try {
                    setIsLoading(true);
                    await removeFromSavedPlaces(auth.currentUser.uid, placeId);
                    setIsSaved(false);
                    const userIds = await getPlaceSavedByUsers(placeId);
                    setSavedByUsers(userIds);
                    const usernames = await getUsernamesFromIds(userIds);
                    setSavedByUsernames(usernames);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        return { isSaved, savedByUsers, savedByUsernames, showAllSavedBy, setShowAllSavedBy, isLoading, savePlace, removePlace };
};