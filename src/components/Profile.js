import React, { useEffect, useState } from 'react';
import { auth } from './../firebase.js';
import {doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase.js';
import PostDetail from './PostDetail';
import {
    H2Centered,
    PageContainer,
    InfoSection,
    RestaurantSection,
    PostGrid,
    PostItem,
    PostContent,
    PostImage,
    PostDetails,
    PostedDate,
    H3Centered
} from '../styles';
import { subscribeToPosts, deletePost } from '../services/firebaseService.js';
import { formatDistanceToNow } from 'date-fns';

function Profile() {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainPostList, setMainPostList] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

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

    const handleDeletingPost = async (id) => {
        await deletePost(id);
        setSelectedPost(null);
    }

    const handleEditClick = () => {
        setSelectedPost(null);
    }

    const handleChangingSelectedPost = (id) => {
        const selection = mainPostList.filter(post => post.id === id)[0];
        setSelectedPost(selection);
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
            onClickingDelete={handleDeletingPost}
            onClickingEdit={handleEditClick}
        />
     );
    }

    return (
        <PageContainer>
            <InfoSection>
                <H2Centered>{username}</H2Centered>
            </InfoSection>
            <RestaurantSection>
                <H2Centered>My Restaurants</H2Centered>
                {mainPostList.length > 0 ? (
                  <PostGrid>
                    {mainPostList.map((post) => (
                      <PostItem key={post.id} onClick={() => handleChangingSelectedPost(post.id)}>
                          <H3Centered>{post.restaurantName}</H3Centered>
                          <PostContent>
                            <PostImage />
                            <PostDetails>
                              <p>{post.priceLevel ? '$'.repeat(post.priceLevel) : 'Price TBD'}</p>
                              <p>{post.rating ? `⭐ ${post.rating} (${post.userRatingsTotal})` : 'Rating TBD'}</p>
                            </PostDetails>
                          </PostContent>
                        <PostedDate>{formatDistanceToNow(post.timeOpen, {addSuffix: true})}</PostedDate>
                      </PostItem>
                    ))}
                  </PostGrid>
                ) : (
                  <p>No No restaurants have been added to the queue yet. Add a restaurant now.</p>
                )}
            </RestaurantSection>
        </PageContainer>
    );
}

export default Profile;
