import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlaceDetail from './PlaceDetail';
import ActionBar from './ActionBar';
import EditPlaceForm from './EditPlaceForm';
import ConfirmDialog from './ConfirmDialog';
import KebabMenu from './KebabMenu';
import { auth } from '../firebase.js';
import { CircularButton, PlaceMenuContainer, PlaceProfileContainer } from '../styles';
import { updatePlace, removeFromSavedPlaces } from '../services/firebaseService';
import { useEditMode } from '../hooks/editMode';

function PlaceProfile({ place, onBack, isSaved, isLoading, onAdd, onPlaceUpdate }) {
    const { isEditing, enterEditMode, exitEditMode } = useEditMode();
    const [removeConfirmation, setRemoveConfirmation] = useState({
        isOpen: false,
        message: '',
    });

    const handleEditingPlace = async (placeToEdit) => {
        const { id, ...placeData } = placeToEdit;
        await updatePlace(id, placeData);
        if (onPlaceUpdate) {
            onPlaceUpdate(placeToEdit);
        }
        exitEditMode();
    };

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
            message: '',
        });
        onBack();
    };

    const handleKebabAction = (item) => {
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

    if (isEditing) {
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
        <PlaceProfileContainer>
            <PlaceDetail place={place} />
            {isSaved === true && ( 
                <PlaceMenuContainer>
                    <KebabMenu items={buildMenuItems()} onItemClick={handleKebabAction} />
                </PlaceMenuContainer>
            )}
            <ActionBar>
                <CircularButton onClick={onBack}>↩</CircularButton>
                {isSaved === false && (
                    <CircularButton onClick={onAdd} disabled={isLoading}>
                        +
                    </CircularButton>
                )}
            </ActionBar>
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
        </PlaceProfileContainer>
    );
}

PlaceProfile.propTypes = {
    place: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
    isSaved: PropTypes.bool,
    isLoading: PropTypes.bool,
    onAdd: PropTypes.func,
    onPlaceUpdate: PropTypes.func
};

export default PlaceProfile;