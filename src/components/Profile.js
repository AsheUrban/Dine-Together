import React, { useEffect, useState } from 'react';
import { auth } from './../firebase.js';
import {doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase.js';
import PostDetail from './PostDetail';
import Avatar from './Avatar';
import {
    H1,
    H2,
    H3Centered,
    PageContainer,
    InfoSection,
    RestaurantSection,
    PostGrid,
    PostWrapper,
    PostItem,
    PostContent,
    PostImage,
    PostDetails,
    PostedDate
} from '../styles';
import { subscribeToPosts } from '../services/firebaseService.js';
import { formatDistanceToNow } from 'date-fns';
import { usePostSelection } from '../hooks/postSelection';

function Profile() {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainPostList, setMainPostList] = useState([]);
    const { selectedPost, handleSelectPost, handleBackToList } = usePostSelection();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
                if (userDoc.exists()) {
                    setUsername(userDoc.data().username);
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
        />
     );
    }

    return (
        <PageContainer>
            <InfoSection>
                <Avatar displayName={username} variant="profile" />
                <H2>{username}</H2>
            </InfoSection>
            <RestaurantSection>
                {mainPostList.length > 0 ? (
                  <PostGrid>
                    {mainPostList.map((post) => (
                      <PostWrapper key={post.id}>
                        <PostItem onClick={() => handleChangingSelectedPost(post.id)}>
                          <H3Centered>{post.restaurantName}</H3Centered>
                          <PostContent>
                            <PostImage />
                            <PostDetails>
                              <p>{post.priceLevel ? '$'.repeat(post.priceLevel) : 'Price TBD'}</p>
                              <p>{post.rating ? `⭐ ${post.rating} (${post.userRatingsTotal})` : 'Rating TBD'}</p>
                            </PostDetails>
                          </PostContent>
                        </PostItem>
                        <PostedDate>{formatDistanceToNow(post.timeOpen, {addSuffix: true})}</PostedDate>
                      </PostWrapper>
                    ))}
                  </PostGrid>
                ) : (
                  <H1>No restaurants have been added yet. Explore restaurants to get started!</H1>
                )}
            </RestaurantSection>
        </PageContainer>
    );
}

export default Profile;
