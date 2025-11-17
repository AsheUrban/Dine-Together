import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {doc, getDoc } from 'firebase/firestore';
import { db } from './../firebase.js';
import { auth } from './../firebase.js';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
import EditPostForm from './EditPostForm';
import PostDetail from './PostDetail';
import { DineTogetherPosts, H2, Button, Center } from '../styles';
import { subscribeToPosts, addNewPost, updatePost, deletePost, updatePostElapsedWaitTimes } from '../services/firebaseService.js';


function Profile() {
    const { userId } = useParams();
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formVisibleOnPage, setFormVisibleOnPage ] = useState(false);
    const [mainPostList, setMainPostList] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', userId));
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
    }, [userId]);

    useEffect(() => {
        function updateElapsedWaitTime() {
        const updatedPosts = updatePostElapsedWaitTimes(mainPostList);
        setMainPostList(updatedPosts);
    }

        const waitTimeUpdateTimer = setInterval(() =>
            updateElapsedWaitTime(),
            60000
        );

        return function cleanup() {
            clearInterval(waitTimeUpdateTimer);
        };
    }, [mainPostList]);

    useEffect(() => {
        const unSubscribe = subscribeToPosts(
            userId,
            (posts) => setMainPostList(posts),
            (errorMessage) => setError(errorMessage)
        );
        return () => unSubscribe();
    }, [userId]);

    const handleClick = () => {
        if (selectedPost != null) {
          setFormVisibleOnPage(false);
          setSelectedPost(null);
          setEditing(false);
        } else {
          setFormVisibleOnPage(!formVisibleOnPage);
        }
      }
    
      const handleDeletingPost = async (id) => {
        await deletePost(id);
        setSelectedPost(null);
      }
    
      const handleEditClick = () => {
        setEditing(true);
      }
    
      const handleEditingPostInList = async (postToEdit) => {
        await updatePost(postToEdit);
        setEditing(false);
        setSelectedPost(null);
      }
    
      const handleAddingNewPostToList = async (newPostData) => {
        await addNewPost(newPostData);
        setFormVisibleOnPage(false);
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

    let currentlyVisibleState = null;
        let buttonText = null; 
    
        if (error) {
          currentlyVisibleState = <p>There was an error: {error}</p>
        } else if (editing) {      
          currentlyVisibleState = <EditPostForm 
          post = {selectedPost} 
          onEditPost = {handleEditingPostInList}
          userId={userId} />
          buttonText = 'Return to Post List';
        } else if (selectedPost != null) {
          currentlyVisibleState = <PostDetail 
          post={selectedPost} 
          onClickingDelete={handleDeletingPost}
          onClickingEdit = {handleEditClick} />
          buttonText = 'Return to Post List';
        } else if (formVisibleOnPage) {
          currentlyVisibleState = <NewPostForm 
          onNewPostCreation={handleAddingNewPostToList}
          userId={userId} />
          buttonText = 'Return to Post List'; 
        } else {
          currentlyVisibleState = <PostList 
          onPostSelection={handleChangingSelectedPost} 
          postList={mainPostList} />;
          buttonText = 'Add Restaurant'; 
        }
        return (
          <>
            <DineTogetherPosts>
                <H2>{username}'s Restaurant Wish List</H2>
            </DineTogetherPosts>
            {currentlyVisibleState}
            <Center>
                {error ? null : <Button onClick={handleClick}>{buttonText}</Button>} 
            </Center>
        </>
    );
}
    
export default Profile;
    