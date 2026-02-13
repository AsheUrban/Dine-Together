import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlaceDetail from './PlaceDetail';
import ActionBar from './ActionBar';
import ConfirmDialog from './ConfirmDialog';
import KebabMenu from './KebabMenu';
import { auth } from '../firebase.js';
import {
    CircularButton,
    PlaceMenuContainer,
    PlaceProfileContainer,
    PlaceSavedBy,
    LinkStyle,
} from '../styles';
import { removeFromSavedPlaces } from '../services/firebaseService';
import { usePlaceSaveState } from '../hooks/placeSaveState';
import { usePlace } from '../hooks/place';

function PlaceProfile() {
    const { placeId } = useParams();
    const navigate = useNavigate();
    const { place, loading, error } = usePlace(placeId);
    const {
        isSaved,
        isLoading,
        savePlace,
        savedByUsers,
        savedByUsernames,
        showAllSavedBy,
        setShowAllSavedBy,
    } = usePlaceSaveState(placeId);
    const [removeConfirmation, setRemoveConfirmation] = useState({
        isOpen: false,
        message: '',
    });

    const handleBack = () => {
        navigate(-1);
    };

    const handleRemove = () => {
        setRemoveConfirmation({
            isOpen: true,
            message:
                'Are you sure you want to remove this restaurant from your saved list?',
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
        if (item.id === 'remove') {
            handleRemove();
        }
    };

    const handleProfileClick = (userId) => {
        navigate(`/profile/${userId}`);
    };

    const renderSavedByInfo = () => {
        if (savedByUsers.length === 0) return null;

        if (savedByUsers.length <= 3) {
            return (
                <PlaceSavedBy>
                    Saved by:{' '}
                    {savedByUsers.map((userId, index) => (
                        <span key={userId}>
                            <LinkStyle
                                onClick={() => handleProfileClick(userId)}
                            >
                                {savedByUsernames[userId]}
                            </LinkStyle>
                            {index < savedByUsers.length - 1 && ', '}
                        </span>
                    ))}
                </PlaceSavedBy>
            );
        }

        return (
            <PlaceSavedBy>
                Saved By:{' '}
                {showAllSavedBy
                    ? savedByUsers.map((userId, index) => (
                          <span key={userId}>
                              <LinkStyle
                                  onClick={() => handleProfileClick(userId)}
                              >
                                  {savedByUsernames[userId]}
                              </LinkStyle>
                              {index < savedByUsers.length - 1 && ', '}
                          </span>
                      ))
                    : `${savedByUsers.length} people`}
                {!showAllSavedBy && (
                    <LinkStyle onClick={() => setShowAllSavedBy(true)}>
                        more
                    </LinkStyle>
                )}
            </PlaceSavedBy>
        );
    };

    if (loading) {
        return null;
    }

    if (error || !place) {
        return <div>Place not found</div>;
    }

    return (
        <PlaceProfileContainer>
            <PlaceDetail place={place} />
            {isSaved === true && (
                <PlaceMenuContainer>
                    <KebabMenu
                        items={[{ id: 'remove', label: 'Remove' }]}
                        onItemClick={handleKebabAction}
                    />
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
                    onCancel={() =>
                        setRemoveConfirmation({
                            isOpen: false,
                            message: '',
                        })
                    }
                    isLoading={isLoading}
                />
            )}
        </PlaceProfileContainer>
    );
}

export default PlaceProfile;
