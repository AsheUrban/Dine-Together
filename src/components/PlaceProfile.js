import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlaceDetail from './PlaceDetail';
import ActionBar from './ActionBar';
import EditPlaceForm from './EditPlaceForm';
import ConfirmDialog from './ConfirmDialog';
import KebabMenu from './KebabMenu';
import { auth } from '../firebase.js';
import { CircularButton, PlaceMenuContainer, PlaceProfileContainer, LinkStyle } from '../styles';
import { updatePlace, removeFromSavedPlaces } from '../services/firebaseService';
import { useEditMode } from '../hooks/editMode';
import { usePlaceSaveState } from '../hooks/placeSaveState';
import { usePlace } from '../hooks/place';

function PlaceProfile() {
    const { placeId } = useParams();
    const navigate = useNavigate();
    const { place, loading, error } = usePlace(placeId);
    const { isEditing, enterEditMode, exitEditMode } = useEditMode();
        const {
            isSaved,
            isLoading,
            savePlace,
            savedByUsers,
            savedByUsernames,
            showAllSavedBy,
            setShowAllSavedBy
        } = usePlaceSaveState(placeId);
    const [removeConfirmation, setRemoveConfirmation] = useState({
        isOpen: false,
        message: '',
    });

    const handleBack = () => {
        navigate(-1);
    };

    const handleEditingPlace = async (placeToEdit) => {
        const { id, ...placeData } = placeToEdit;
        await updatePlace(id, placeData);
        exitEditMode();
    };

    const handleRemove = () => {
        setRemoveConfirmation({
            isOpen: true,
            message: 'Are you sure you want to remove this restaurant from your saved list?'
        });
    };

    const confirmRemovePlace = async () => {
        await removeFromSavedPlaces(auth.currentUser.uid, placeId);
        setRemoveConfirmation({ 
            isOpen: false,
            message: '',
        });
        handleBack();
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
        if (isSaved) {
            items.push({ id: 'edit', label: 'Edit' });
        }
        items.push({ id: 'remove', label: 'Remove' });
        return items;
    };

     const handleProfileClick = ( userId) => {
        navigate(`/profile/${userId}`);
    };

    const renderSavedByInfo = () => {
        if (savedByUsers.length === 0) return null;

        if (savedByUsers.length <= 3) {
            return (
                <p>
                    Saved by: {savedByUsers.map((userId, index) => (
                        <span key={userId}> 
                            <LinkStyle onClick={() => handleProfileClick(userId)}>
                                {savedByUsernames[userId]}
                            </LinkStyle>
                            {index < savedByUsers.length - 1 && ', '}
                        </span>
                    ))}
                </p>     
            );
        }

        return (
            <p>
                Saved By: {showAllSavedBy ?
                    savedByUsers.map((userId, index) => (
                        <span key={userId}> 
                            <LinkStyle onClick={() => handleProfileClick(userId)}>
                                {savedByUsernames[userId]}
                            </LinkStyle>
                            {index < savedByUsers.length - 1 && ', '}
                        </span>
                    ))
                    : `${savedByUsers.length} people`
                }
                {!showAllSavedBy && (
                    <LinkStyle onClick={() => setShowAllSavedBy(true)}>
                        more
                    </LinkStyle>
                    )}
            </p>
        );
    };

    if (loading) {
        return null;
    }

    if (error || !place) {
        return <div>Place not found</div>
    }

    if (isEditing) {
        return (
            <EditPlaceForm
                place={place}
                onEditPlace={handleEditingPlace}
                userId={place.userId}
                onBack={handleBack}
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
                <CircularButton onClick={handleBack}>↩</CircularButton>
                {isSaved === false && (
                    <CircularButton onClick={savePlace} disabled={isLoading}>
                        +
                    </CircularButton>
                )}
                {renderSavedByInfo()}
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

export default PlaceProfile;