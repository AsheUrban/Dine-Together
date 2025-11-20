import { useEffect } from 'react';
import {updatePlaceElapsedWaitTimes } from '../services/firebaseService.js';

export const useWaitTimeUpdater = (places, setPlaces) => {
    useEffect(() => {
        function updateElapsedWaitTime() {
        const updatedPlaces = updatePlaceElapsedWaitTimes(places);
        setPlaces(updatedPlaces);
        }

        const waitTimeUpdateTimer = setInterval(() =>
        updateElapsedWaitTime(),
        60000
        );

        return function cleanup() {
        clearInterval(waitTimeUpdateTimer);
        }
    }, [places, setPlaces]);
}