import PlaceProfile from './PlaceProfile';
import PlaceGrid from './PlaceGrid';
import PostList from './PostList';
import UserDetails from './UserDetails';
import EditPostForm from './EditPostForm';
import ConfirmDialog from './ConfirmDialog';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from './../firebase.js';
import { useUser } from '../hooks/user';
import { updateUserBio, deletePost, updatePostCaption } from '../services/firebaseService.js';
import { useUserPosts } from '../hooks/userPosts';
import { useUserPlaces } from '../hooks/userPlaces';
import { usePlaceSelection } from '../hooks/placeSelection';
import { useEditMode } from '../hooks/editMode';
import { useFormSubmit } from '../hooks/formSubmit';
import {
    PageContainer,
    RestaurantSection,
    TabContainer,
    TabButton
} from '../styles';

function UserProfile() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const isOwnProfile = userId === auth.currentUser?.uid;
    const [activeTab, setActiveTab] = useState('places');
    const [editingPostId, setEditingPostId] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        isOpen: false,
        message: '',
        postId: null
    });
    const { username, userBio, loading, error } = useUser(userId);
    const { posts, loading: postsLoading } = useUserPosts(userId);
    const { places, loading: placesLoading } = useUserPlaces(userId);
    const { selectedPlace, handleSelectPlace, handleBackToList } = usePlaceSelection();
    const { isEditing, enterEditMode, exitEditMode } = useEditMode();
    const { isLoading, handleSubmit } = useFormSubmit(async (bioData) => {
        try {
            await updateUserBio(userId, bioData);
            exitEditMode();
        } catch (err) {
            console.error('Error updating bio:', err);
        }
    });

    const handlePlaceUpdate = (updatedPlace) => {
        if (selectedPlace && selectedPlace.id === updatedPlace.id) {
            handleSelectPlace({ ...selectedPlace, ...updatedPlace });
        }
    };

    const selectPlace = (id) => {
        const selection = places.find(place => place.id === id);
        handleSelectPlace(selection);
    }

    const selectPlaceFromPost = (postId, place, authorId) => {
        handleSelectPlace(place);
    };

    const handleUserClick = (clickedUserId) => {
        navigate(`/profile/${clickedUserId}`);
    };

    const handleEditPost = (postId) => {
        setEditingPostId(postId);
    };

    const handleDeletePost = (postId) => {
        setDeleteConfirmation({
            isOpen: true,
            message: 'Are you sure you want to delete this post?',
            postId: postId
        });
    };

    const confirmDeletePost = async () => {
      await deletePost(deleteConfirmation.postId);
      setDeleteConfirmation({
        isOpen: false,
        message: '',
        postId: null
      });
    };
    
    const handleSaveEditPost = async (postData) => {
      await updatePostCaption(postData.id, postData.caption);
      setEditingPostId(null);
    };

    if(loading || postsLoading || placesLoading) {
        return null;
    }

    if(error || (!loading && !username)) {
        return <div>User not found</div>;
    }

    if(selectedPlace) {
        return (
          <PlaceProfile
            place={selectedPlace}
            onBack={handleBackToList}
            onUserClick={handleUserClick}
            onPlaceUpdate={isOwnProfile ? handlePlaceUpdate : undefined}
        />
     );
    }

     if(editingPostId && isOwnProfile) {
        return (
          <EditPostForm
              post={posts.find(p => p.id === editingPostId)}
              onEditPost={handleSaveEditPost}
              onBack={() => setEditingPostId(null)}
              onDelete={handleDeletePost}
            />
        );
      }
    
      const postsWithOwnership = posts.map(post => ({
          ...post,
          isOwner: isOwnProfile && post.userId === auth.currentUser.uid
      }));

    return (
        <PageContainer>
           <UserDetails
                username={username}
                userBio={userBio}
                isEditing={isEditing}
                enterEditMode={enterEditMode}
                exitEditMode={exitEditMode}
                onSave={handleSubmit}
                isLoading={isLoading}
                isOwnProfile={isOwnProfile}
            />
            <RestaurantSection>
                <TabContainer>
                    <TabButton active={activeTab === 'places'} onClick={() => setActiveTab('places')}>Restaurants</TabButton>
                    <TabButton active={activeTab === 'posts'} onClick={() => setActiveTab('posts')}>Posts</TabButton>
                </TabContainer>
                {activeTab === 'posts' ? (
                    <PostList 
                        postList={postsWithOwnership}
                        onPostSelection={selectPlaceFromPost} 
                        onEditPost={isOwnProfile ? handleEditPost : undefined}
                        onDeletePost={isOwnProfile ? handleDeletePost : undefined}
                        onUserClick={handleUserClick}
                    />
                ) : (
                <PlaceGrid placeList={places} onPlaceSelection={selectPlace} />
                )}
            </RestaurantSection>
            {deleteConfirmation.isOpen && (
                    <ConfirmDialog
                        isOpen={deleteConfirmation.isOpen}
                        message={deleteConfirmation.message}
                        onConfirm={confirmDeletePost}
                        onCancel={() => setDeleteConfirmation({
                            isOpen: false,
                            message: '',
                            postId: null
                        })}
                    />
                )}
                </PageContainer>
            );
        }

export default UserProfile;
