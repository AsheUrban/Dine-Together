import PlaceDetail from './PlaceDetail';
import PlaceGrid from './PlaceGrid';
import PostList from './PostList';
import ProfileDetails from './ProfileDetails';
import React, { useEffect, useState } from 'react';
import { auth } from './../firebase.js';
import { useUser } from '../hooks/user.js';
import { subscribeToUserPlaces, subscribeToUserPosts } from '../services/firebaseService.js';
import { updateUserBio } from '../services/firebaseService.js';
import { usePlaceSelection } from '../hooks/placeSelection';
import { usePlaceUpdate } from '../hooks/placeUpdate.js';
import { useEditMode } from '../hooks/editMode.js';
import { useFormSubmit } from '../hooks/formSubmit.js';
import {
    PageContainer,
    RestaurantSection,
    TabContainer,
    TabButton
} from '../styles';

function Profile() {
    const [mainPlaceList, setMainPlaceList] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('places');
    const { username, userBio, loading, error } = useUser(auth.currentUser.uid);
    const { selectedPlace, handleSelectPlace, handleBackToList } = usePlaceSelection();
    const { isEditing, enterEditMode, exitEditMode } = useEditMode();
    const { isLoading, handleSubmit } = useFormSubmit(async (bioData) => {
        try {
            await updateUserBio(auth.currentUser.uid, bioData);
            exitEditMode();
        } catch (err) {
            console.error('Error updating bio:', err);
        }
    });
    const handlePlaceUpdate = usePlaceUpdate(setMainPlaceList, selectedPlace, handleSelectPlace);

    useEffect(() => {
        const unSubscribe = subscribeToUserPosts(
            auth.currentUser.uid,
            (posts) => setUserPosts(posts)
        );
        return () => unSubscribe();
    }, []);

    useEffect(() => {
        const unSubscribe = subscribeToUserPlaces(
            auth.currentUser.uid,
            (places) => setMainPlaceList(places)
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
                <TabContainer>
                    <TabButton active={activeTab === 'places'} onClick={() => setActiveTab('places')}>Restaurants</TabButton>
                    <TabButton active={activeTab === 'posts'} onClick={() => setActiveTab('posts')}>Posts</TabButton>
                </TabContainer>
                {activeTab === 'posts' ? (
                    <PostList postList={userPosts} onPostSelection={() => {}} />
                ) : (
                <PlaceGrid placeList={mainPlaceList} onPlaceSelection={handleChangingSelectedPlace} />
                )}
            </RestaurantSection>
        </PageContainer>
    );
}

export default Profile;
