import React from 'react';
import PlaceList from './PlaceList';
import PlaceDetail from './PlaceDetail';
import { useState, useEffect } from 'react';
import { auth } from '../firebase.js';
import { FormContainer, H1 } from '../styles';
import { subscribeToAllPlaces, updatePlaceElapsedWaitTimes } from '../services/firebaseService.js';
import { usePlaceSelection } from '../hooks/placeSelection.js';
import { usePlaceUpdate } from '../hooks/placeUpdate.js';

function Feed () {
  const [mainPlaceList, setMainPlaceList] = useState([]);
  const [error, setError] = useState(null);
  const { selectedPlace, handleSelectPlace, handleBackToList } = usePlaceSelection();
  const handlePlaceUpdate = usePlaceUpdate(setMainPlaceList, selectedPlace, handleSelectPlace);

  useEffect(() => {
    function updateElapsedWaitTime() {
      const updatedPlaces = updatePlaceElapsedWaitTimes(mainPlaceList);
      setMainPlaceList(updatedPlaces);
    }

    const waitTimeUpdateTimer = setInterval(() =>
      updateElapsedWaitTime(),
      60000
    );

    return function cleanup() {
      clearInterval(waitTimeUpdateTimer);
    }
  }, [mainPlaceList])

  useEffect(() => {
    const unSubscribe = subscribeToAllPlaces(
      (places) => setMainPlaceList(places),
      (errorMessage) => setError(errorMessage)
    );
    return () => unSubscribe();
  }, []);

  const handleChangingSelectedPlace = (id) => {
    const selection = mainPlaceList.filter(place => place.id === id)[0];
    handleSelectPlace(selection);
  }

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <FormContainer>
          <H1>You must be signed in to access the feed.</H1>
        </FormContainer>
      </React.Fragment>
    )
  }

  if (error) {
    return <div>There was an error: {error}</div>
  }

  if (selectedPlace) {
    return (
      <PlaceDetail
      place={selectedPlace}
      onBack={handleBackToList}
      onPlaceUpdate={handlePlaceUpdate}
      />
    );
  }

  return (
    <PlaceList
      onPlaceSelection={handleChangingSelectedPlace}
      placeList={mainPlaceList}
    />
  );
}

export default Feed;
