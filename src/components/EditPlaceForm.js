import React from 'react';
import PropTypes from 'prop-types';
import ReusablePlaceForm from './ReusablePlaceForm';
import { CircularButton } from '../styles';

function EditPlaceForm (props) {
  const { place, onBack } = props;

  const handleSubmit = (placeData) => {
        props.onEditPlace({
            ...placeData,
            id: place.id
        });
    };

  return (
      <ReusablePlaceForm
        onSubmit={handleSubmit}
        buttonText="Save"
        restaurantName={place.restaurantName}
        placeId={place.placeId}
        notes={place.notes}
        backButton={<CircularButton onClick={onBack}>↩</CircularButton>}
      />
    );
}

EditPlaceForm.propTypes = {
  onEditPlace: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired
};

export default EditPlaceForm;
