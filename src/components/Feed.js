import React from 'react';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
import EditPostForm from './EditPostForm';
import PostDetail from './PostDetail';
import { useState, useEffect } from 'react';
import { auth } from '../firebase.js';
import { FormContainer, H1, Button, Center } from '../styles';
import { subscribeToAllPosts, addNewPost, updatePost, deletePost, updatePostElapsedWaitTimes } from '../services/firebaseService.js';

function Feed () {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainPostList, setMainPostList] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

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
    }
  }, [mainPostList])

  useEffect(() => {
    const unSubscribe = subscribeToAllPosts(
      (posts) => setMainPostList(posts),
      (errorMessage) => setError(errorMessage)
    );
    return () => unSubscribe();
  }, []);

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

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <FormContainer>
           <H1>You must be signed in to access the feed.</H1>
        </FormContainer>
      </React.Fragment>
    )
  } else if (auth.currentUser != null) {

    let currentlyVisibleState = null;
    let buttonText = null;

    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>
    } else if (editing) {
      currentlyVisibleState = <EditPostForm
      post = {selectedPost}
      onEditPost = {handleEditingPostInList}
      userId={auth.currentUser.uid} />
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
      userId={auth.currentUser.uid} />
      buttonText = 'Return to Post List';
    } else {
      currentlyVisibleState = <PostList
      onPostSelection={handleChangingSelectedPost}
      postList={mainPostList} />;
      buttonText = 'Add Restaurant';
    }
    return (
      <>
        {currentlyVisibleState}
        <Center>
          {error ? null : <Button className='App' onClick={handleClick}>{buttonText}</Button>}
        </Center>
      </>
    );
  }
}


export default Feed;
