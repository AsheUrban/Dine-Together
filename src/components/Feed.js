import React from 'react';
import PostList from './PostList';
import PostDetail from './PostDetail';
import { useState, useEffect } from 'react';
import { auth } from '../firebase.js';
import { FormContainer, H1 } from '../styles';
import { subscribeToAllPosts, updatePostElapsedWaitTimes } from '../services/firebaseService.js';
import { usePostSelection } from '../hooks/postSelection.js';
import { usePostUpdate } from '../hooks/postUpdate.js';

function Feed () {
  const [mainPostList, setMainPostList] = useState([]);
  const [error, setError] = useState(null);
  const { selectedPost, handleSelectPost, handleBackToList } = usePostSelection();
  const handlePostUpdate = usePostUpdate(setMainPostList, selectedPost, handleSelectPost);

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

  const handleChangingSelectedPost = (id) => {
    const selection = mainPostList.filter(post => post.id === id)[0];
    handleSelectPost(selection);
  }

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <FormContainer>
          <H1>You must be signed in to access the feed.</H1>
        </FormContainer>
      </React.Fragment>
    )
  } 

  if (error) {
    return <div>There was an error: {error}</div>
  } 
  
  if (selectedPost) {
    return (
      <PostDetail
      post={selectedPost}
      onBack={handleBackToList}
      onPostUpdate={handlePostUpdate}
      />
    );
  } 

  return (
    <PostList 
      onPostSelection={handleChangingSelectedPost}
      postList={mainPostList} 
    />
  );
}

export default Feed;
