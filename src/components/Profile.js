import PostDetail from './PostDetail';
import PostGrid from './PostGrid';
import ProfileDetails from './ProfileDetails';
import React, { useEffect, useState } from 'react';
import { auth } from './../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase.js';
import { subscribeToPosts } from '../services/firebaseService.js';
import { updateUserBio } from '../services/firebaseService.js';
import { usePostSelection } from '../hooks/postSelection';
import { usePostUpdate } from '../hooks/postUpdate.js';
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
    const [mainPostList, setMainPostList] = useState([]);
    const { selectedPost, handleSelectPost, handleBackToList } = usePostSelection();
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
    const handlePostUpdate = usePostUpdate(setMainPostList, selectedPost, handleSelectPost);

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
        const unSubscribe = subscribeToPosts(
            auth.currentUser.uid,
            (posts) => setMainPostList(posts),
            (errorMessage) => setError(errorMessage)
        );
        return () => unSubscribe();
    }, []);

    const handleChangingSelectedPost = (id) => {
        const selection = mainPostList.filter(post => post.id === id)[0];
        handleSelectPost(selection);
    }

    if(loading) {
        return <div>Loading profile...</div>;
    }

    if(error) {
        return <div>{error}</div>;
    }

    if(selectedPost) {
        return (
          <PostDetail
            post={selectedPost}
            onBack={handleBackToList}
            onPostUpdate={handlePostUpdate}
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
                <PostGrid postList={mainPostList} onPostSelection={handleChangingSelectedPost} />
            </RestaurantSection>
        </PageContainer>
    );
}

export default Profile;
