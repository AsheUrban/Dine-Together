import PlaceDetail from './PlaceDetail';
import PostGrid from './PostGrid';
import ProfileDetails from './ProfileDetails';
import React, { useEffect, useState } from 'react';
import { auth } from './../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase.js';
import { subscribeToPlaces } from '../services/firebaseService.js';
import { updateUserBio } from '../services/firebaseService.js';
import { usePlaceSelection } from '../hooks/placeSelection';
import { usePlaceUpdate } from '../hooks/placeUpdate.js';
import { useEditMode } from '../hooks/editMode.js';
import { useFormSubmit } from '../hooks/formSubmit.js';
import {
    PageContainer,
    RestaurantSection,
} from '../styles';

function Profile() {
    const [username, setUsername] = useState(null);
    const [userBio, setUserBio] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainPlaceList, setMainPlaceList] = useState([]);
    const { selectedPlace, handleSelectPlace, handleBackToList } = usePlaceSelection();
    const { isEditing, enterEditMode, exitEditMode } = useEditMode();
    const { isLoading, handleSubmit } = useFormSubmit(async (bioData) => {
        try {
            await updateUserBio(auth.currentUser.uid, bioData);
            setUserBio(prev => ({ ...prev, ...bioData }));
            exitEditMode();
        } catch (err) {
            console.error('Error updating bio:', err);
        }
    });
    const handlePlaceUpdate = usePlaceUpdate(setMainPlaceList, selectedPlace, handleSelectPlace);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
                if (userDoc.exists()) {
                    setUsername(userDoc.data().username);
                    setUserBio(userDoc.data());
                } else {
                    setError('User not found');
                }
            } catch (err) {
                setError('Error loading profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    useEffect(() => {
        const unSubscribe = subscribeToPlaces(
            auth.currentUser.uid,
            (places) => setMainPlaceList(places),
            (errorMessage) => setError(errorMessage)
        );
        return () => unSubscribe();
    }, []);

    const handleChangingSelectedPlace = (id) => {
        const selection = mainPlaceList.filter(place => place.id === id)[0];
        handleSelectPlace(selection);
    }

    if(loading) {
        return <div>Loading profile...</div>;
    }

    if(error) {
        return <div>{error}</div>;
    }

    if(selectedPlace) {
        return (
          <PlaceDetail
            place={selectedPlace}
            onBack={handleBackToList}
            onPlaceUpdate={handlePlaceUpdate}
        />
     );
    }

    return (
        <PageContainer>
           <ProfileDetails
                username={username}
                userBio={userBio}
                isEditing={isEditing}
                enterEditMode={enterEditMode}
                exitEditMode={exitEditMode}
                onSave={handleSubmit}
                isLoading={isLoading}
            />
            <RestaurantSection>
                <PostGrid postList={mainPlaceList} onPostSelection={handleChangingSelectedPlace} />
            </RestaurantSection>
        </PageContainer>
    );
}

export default Profile;
