import React from 'react';
import PropTypes from 'prop-types';
import EditPlaceForm from './EditPlaceForm';
import { auth } from '../firebase.js';
import { PlaceContainer, H3Centered, H4, PlaceActionButton } from '../styles';
import { updatePlace, deletePlace } from '../services/firebaseService';
import { useEditMode } from '../hooks/editMode';
import { useDeleteConfirmation } from '../hooks/deleteConfirmation';

function PlaceDetail(props){
    const { place, onBack, onPlaceUpdate } = props;
    const { isEditing, enterEditMode, exitEditMode } = useEditMode();
    const { confirmDelete } = useDeleteConfirmation();
    const isOwner = auth.currentUser.uid === place.userId;

    const handleEditingPlace = async (placeToEdit) => {
        await updatePlace(placeToEdit);
        if(onPlaceUpdate) {
            onPlaceUpdate(placeToEdit);
        }
        exitEditMode();
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this restaurant?');
        if(confirmed) {
            await confirmDelete(async () => {
                await deletePlace(id);
                onBack();
            });
        }
    }

    if(isEditing) {
        return (
                <EditPlaceForm
                    place={place}
                    onEditPlace={handleEditingPlace}
                    userId={place.userId}
                    onBack={onBack}
                    onDelete={handleDelete}
                />
        );
    }

    return (
        <React.Fragment>
            <PlaceContainer>
                <H3Centered>{place.restaurantName}</H3Centered>
                <H4>{place.restaurantAddress}</H4>
                <p><em>{place.notes}</em></p>
                {isOwner && <PlaceActionButton onClick={enterEditMode}>Edit</PlaceActionButton>}
                <PlaceActionButton onClick={onBack}>Back</PlaceActionButton>
            </PlaceContainer>
        </React.Fragment>
    );
}

PlaceDetail.propTypes = {
    place: PropTypes.object,
    onBack: PropTypes.func,
    onPlaceUpdate: PropTypes.func
};

export default PlaceDetail;
