import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditPlaceForm from './EditPlaceForm';
import ConfirmDialog from './ConfirmDialog.js';
import { auth } from '../firebase.js';
import { PlaceContainer, H3Centered, H4, PlaceActionButton } from '../styles';
import { updatePlace, removeFromSavedPlaces } from '../services/firebaseService';
import { useEditMode } from '../hooks/editMode';
import { usePlaceSaveState } from '../hooks/placeSaveState';

function PlaceDetail(props){
    const { place, onBack, onPlaceUpdate } = props;
    const { isEditing, enterEditMode, exitEditMode } = useEditMode();
    const { isSaved, isLoading, savePlace } = usePlaceSaveState(place.id);
    const [removeConfirmation, setRemoveConfirmation] = useState({
        isOpen: false,
        message: '',
    });
   
    const handleEditingPlace = async (placeToEdit) => {
        const { id, ...placeData } = placeToEdit;
        await updatePlace(id, placeData);
        if(onPlaceUpdate) {
            onPlaceUpdate(placeToEdit);
        }
        exitEditMode();
    }

    const handleRemove = () => {
       setRemoveConfirmation({
            isOpen: true,
            message: 'Are you sure you want to remove this restaurant from your saved list?'
       });
    };

    const confirmRemovePlace = async () => {
        await removeFromSavedPlaces(auth.currentUser.uid, place.id);
        setRemoveConfirmation({ 
            isOpen: false,
            message: ''
        });
        onBack();
    };

    if(isEditing) {
        return (
                <EditPlaceForm
                    place={place}
                    onEditPlace={handleEditingPlace}
                    userId={place.userId}
                    onBack={onBack}
                    onDelete={handleRemove}
                />
        );
    }

    return (
        <React.Fragment>
            <PlaceContainer>
                <H3Centered>{place.restaurantName}</H3Centered>
                <H4>{place.restaurantAddress}</H4>
                <p><em>{place.notes}</em></p>
                {isSaved ? (
                    <>
                        {onPlaceUpdate && <PlaceActionButton onClick={enterEditMode}>Edit</PlaceActionButton>}
                        <PlaceActionButton onClick={handleRemove} disabled={isLoading}>Remove</PlaceActionButton>
                    </>
                ) : (
                    <PlaceActionButton onClick={savePlace} disabled={isLoading}>Add</PlaceActionButton>
                )}
                <PlaceActionButton onClick={onBack}>Back</PlaceActionButton>
            </PlaceContainer>
            {removeConfirmation.isOpen && (
                                <ConfirmDialog
                                    isOpen={removeConfirmation.isOpen}
                                    message={removeConfirmation.message}
                                    onConfirm={confirmRemovePlace}
                                    onCancel={() => setRemoveConfirmation({
                                        isOpen: false,
                                        message: '',
                                    })}
                                    isLoading={isLoading}
                                />
                            )}
        </React.Fragment>
    );
}

PlaceDetail.propTypes = {
    place: PropTypes.object,
    onBack: PropTypes.func,
    onPlaceUpdate: PropTypes.func
};

export default PlaceDetail;
