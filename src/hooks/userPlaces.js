import { useState, useEffect } from 'react';
import { auth } from './../firebase.js';
import { subscribeToPlaces } from '../services/firebaseService.js';


export const useUserPlaces = () => {
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
    const unSubscribe = subscribeToPlaces(
        auth.currentUser.uid,
        (placesData) => setPlaces(placesData),
        (errorMessage) => setError(errorMessage)
    );
    return () => unSubscribe();
    }, []);

    return {
    places,
    error
    }
}