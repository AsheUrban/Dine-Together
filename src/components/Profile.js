import PlaceDetail from './PlaceDetail';
import PlaceGrid from './PlaceGrid';
import PostList from './PostList';
import ProfileDetails from './ProfileDetails';
import EditPostForm from './EditPostForm.js';
import ConfirmDialog from './ConfirmDialog.js';
import React, { useEffect, useState } from 'react';
import { auth } from './../firebase.js';
import { useUser } from '../hooks/user.js';
import { subscribeToUserPlaces, subscribeToUserPosts, updateUserBio, deletePost, updatePostCaption } from '../services/firebaseService.js';
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
    const [posts, setUserPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('places');
    const [editingPostId, setEditingPostId] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        isOpen: false,
        message: '',
        postId: null
    });
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

    const selectPlace = (id) => {
        const selection = mainPlaceList.filter(place => place.id === id)[0];
        handleSelectPlace(selection);
    }

    const selectPlaceFromPost = (postId, place, authorId) => {
        handleSelectPlace(place);
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

     if(editingPostId) {
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
          isOwner: post.userId === auth.currentUser.uid
      }));

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
                    <PostList 
                        postList={postsWithOwnership}
                        onPostSelection={selectPlaceFromPost} 
                        onEditPost={handleEditPost}
                        onDeletePost={handleDeletePost}
                    />
                ) : (
                <PlaceGrid placeList={mainPlaceList} onPlaceSelection={selectPlace} />
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

export default Profile;
