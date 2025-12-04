import React from 'react';
import PropTypes from 'prop-types';
import ReusablePlaceForm from './ReusablePlaceForm';
import { serverTimestamp } from "firebase/firestore";

function NewPlaceForm(props){
  const handleSubmit = (placeData) => {
      props.onNewPlaceCreation({
          ...placeData,
          userId: props.userId,
          timeOpen: serverTimestamp()
      });
  };

  return (
      <ReusablePlaceForm
        onSubmit={handleSubmit}
        buttonText='Add Restaurant'
      />
  );
}

NewPlaceForm.propTypes = {
  onNewPlaceCreation: PropTypes.func.isRequired,
  userId: PropTypes.string
};

export default NewPlaceForm;
