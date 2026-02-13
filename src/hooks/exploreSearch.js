import { useState, useEffect } from 'react';
import { searchPlaces } from '../services/googlePlacesService';

export const useExploreSearch = (query) => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoordinates({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (err) => {
                    console.log(
                        'Geolocation denied or unavailable, using broad search',
                    );
                    //place holder for fallback, profile defined user location.
                },
            );
        }
    }, []);

    useEffect(() => {
        if (query.length < 2) {
            setPlaces([]);
            return;
        }

        const timeoutId = setTimeout(async () => {
            setLoading(true);
            try {
                const results = await searchPlaces(query, coordinates);
                setPlaces(results);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, coordinates]);

    return {
        places,
        loading,
        error,
        hasResults: places.length > 0,
    };
};
