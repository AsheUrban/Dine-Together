import { useState, useEffect } from 'react';
import { searchPlaces } from '../services/googlePlacesService';

export const useExploreSearch = (query) => {
    const [places, setPlaces] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState({ places: false, users: false });
    const [error, setError] = useState(null);
    const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoordinates({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (err) => {
                    console.log('Geolocation denied or unavailable, using broad search');
                    //place holder for fallback, profile defined user location.
                }
            );
        }
    }, []);

    useEffect(() => {
        if (query.length < 2) {
            setPlaces([]);
            setUsers([]);
            return;
        }

        const timeoutId = setTimeout(async () => {
            setLoading(prev => ({ ...prev, places: true }));
            try {
                const results = await searchPlaces(query, coordinates);
                setPlaces(results);
            } catch (err) {
                setError(err.message);
            }
            setLoading(prev => ({ ...prev, places: false }));

            // user search placeholder
            //if (query.length >= 3) {
            //setLoading(prev => ({ ...prev, users: true }));
            //const userResults = await searchUsers(query);
            //setUsers(userResults);
            //setLoading(prev => ({ ...prev, users: false }));
            // }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, coordinates]);

    return {
        places,
        users,
        loading: loading.places || loading.users,
        placesLoading: loading.places,
        usersLoading: loading.users,
        error,
        hasResults: places.length > 0 || users.length > 0
    };
};