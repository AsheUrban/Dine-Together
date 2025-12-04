import { useState } from 'react';

export const usePlaceSelection = () => {
    const [selectedPlace, setSelectedPlace] = useState(null);

    const handleSelectPlace = (place) => {
        setSelectedPlace(place);
    }

    const handleBackToList = () => {
        setSelectedPlace(null);
    }

    return {
        selectedPlace,
        handleSelectPlace,
        handleBackToList
    }
}