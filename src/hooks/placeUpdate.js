    import { useCallback } from 'react';

    export const usePlaceUpdate = (setMainPlaceList, selectedPlace, handleSelectPlace) => {
        const handlePlaceUpdate = useCallback((updatedPlace) => {
            setMainPlaceList(prevList =>
                prevList.map(place => place.id === updatedPlace.id ? { ...place, ...updatedPlace } : place)
            );
            if(selectedPlace && selectedPlace.id === updatedPlace.id) {
                handleSelectPlace({ ...selectedPlace, ...updatedPlace });
            }
        }, [setMainPlaceList, selectedPlace, handleSelectPlace]);

        return handlePlaceUpdate;
    }      