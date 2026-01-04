import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditPlaceForm from './EditPlaceForm';
import ConfirmDialog from './ConfirmDialog.js';
import KebabMenu from './KebabMenu.js';
import { auth } from '../firebase.js';
import { PlaceContainer, H3Centered, H4, PlaceActionButton, PlaceMenuContainer, CircularBackButton } from '../styles';
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

        const handleKebabAction= (item) => {
        if (item.id === 'edit') {
            enterEditMode();
        } else if (item.id === 'remove') {
            handleRemove();
        }
    };

    const buildMenuItems = () => {
        const items = [];
        if (onPlaceUpdate) {
            items.push({ id: 'edit', label: 'Edit' });
        }
        items.push({ id: 'remove', label: 'Remove' });
        return items;
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
                 {isSaved === true && (
                    <PlaceMenuContainer>
                        <KebabMenu items={buildMenuItems()} onItemClick={handleKebabAction} />
                    </PlaceMenuContainer>
                 )}
                <H3Centered>{place.restaurantName}</H3Centered>
                <H4>{place.restaurantAddress}</H4>
                <p><em>{place.notes}</em></p>
                {isSaved === false && (
                    <PlaceActionButton onClick={savePlace} disabled={isLoading}>Add</PlaceActionButton>
                )}
                <CircularBackButton onClick={onBack}>↩</CircularBackButton>
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
