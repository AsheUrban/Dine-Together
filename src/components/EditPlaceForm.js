import React from 'react';
import PropTypes from 'prop-types';
import ReusablePlaceForm from './ReusablePlaceForm';
import { PlaceActionButton } from '../styles';

//logic for handleEditingPlace is in PlaceDetail.js

function EditPlaceForm (props) {
  const { place, onBack, onDelete } = props;

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
        cancelButton={<PlaceActionButton onClick={onBack}>Cancel</PlaceActionButton>}
        deleteButton={<PlaceActionButton onClick={()=> onDelete(place.id)}>Delete</PlaceActionButton>}
      />
    );
}

EditPlaceForm.propTypes = {
  onEditPlace: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default EditPlaceForm;
