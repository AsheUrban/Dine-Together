import { useState } from 'react';
import { findPlaceByGoogleId, createPlace } from '../services/firebaseService';
import {
    fetchPlaceDetails,
    transformPlaceDetails,
} from '../services/googlePlacesService';

export const usePlaceSelect = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const selectPlace = async (googlePlaceId) => {
        setLoading(true);
        setError(null);
        try {
            const existing = await findPlaceByGoogleId(googlePlaceId);
            if (existing) {
                return existing;
            }

            const googleData = await fetchPlaceDetails(googlePlaceId);

            const placeData = transformPlaceDetails(googleData);
            return await createPlace(placeData);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { selectPlace, loading, error };
};
