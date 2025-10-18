import React from 'react';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
import EditPostForm from './EditPostForm';
import PostDetail from './PostDetail';
import { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase.js';
import { formatDistanceToNow } from 'date-fns';
import styled from 'styled-components';

function PostControl() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainPostList, setMainPostList] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  const Button = styled.button`
    background-color: #700629;
    border: 1px solid #FFFBC8;
    color: #FFFBC8;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: flex;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
  `;

  const Center = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    width: 1230px;
    color: #FFFBC8;
    padding: 25px;
    margin: auto;
  `;
  
  const DineTogetherPosts = styled.div`
    background-color: #E7DDEE;
    width: 300px;
    margin: auto;
    margin-top: 50px;
    padding: 45px;
    border: 2px solid #fffbc8;
    text-align: center;
    border-radius: 10px;
    `;

  const H1 = styled.h1`
    font-size: 30px;
    color: #700629;
    margin: 0;
    `;

  useEffect(() => {
    function updatePostElapsedWaitTime() {
      const newMainPostList = mainPostList.map(post => {
        const newFormattedWaitTime = formatDistanceToNow(post.timeOpen);
        return {...post, formattedWaitTime: newFormattedWaitTime};
      });
      setMainPostList(newMainPostList);
    }

    const waitTimeUpdateTimer = setInterval(() =>
      updatePostElapsedWaitTime(), 
      60000
    );

    return function cleanup() {
      clearInterval(waitTimeUpdateTimer);
    }
  }, [mainPostList])

  useEffect(() => { 
    const queryByTimestamp = query(
      collection(db, "posts"), 
      orderBy('timeOpen')
    );
    const unSubscribe = onSnapshot(
      queryByTimestamp, 
      (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          const timeOpen = doc.get('timeOpen', {serverTimestamps: "estimate"}).toDate();
          const jsDate = new Date(timeOpen);
          posts.push({
            names: doc.data().names, 
            location: doc.data().location, 
            issue: doc.data().issue, 
            timeOpen: jsDate,
            formattedWaitTime: formatDistanceToNow(jsDate),
            id: doc.id
          });
        });
        setMainPostList(posts);
      },
      (error) => {
        setError(error.message);
      }
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
    await deleteDoc(doc(db, 'posts', id));
    setSelectedPost(null);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleEditingPostInList = async (postToEdit) => {
    const postRef = doc(db, 'posts', postToEdit.id);
    await updateDoc(postRef, postToEdit);
    setEditing(false);
    setSelectedPost(null);
  }

  const handleAddingNewPostToList = async (newPostData) => {
    const collectionRef = collection(db, 'posts');
    await addDoc(collectionRef, newPostData);
    setFormVisibleOnPage(false);
  }

  
  const handleChangingSelectedPost = (id) => {
    const selection = mainPostList.filter(post => post.id === id)[0];
    setSelectedPost(selection);
  }

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <DineTogetherPosts>
           <H1>You must be signed in to access the queue.</H1>
        </DineTogetherPosts>
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
      onEditPost = {handleEditingPostInList} />
      buttonText = 'Return to Post List';
    } else if (selectedPost != null) {
      currentlyVisibleState = <PostDetail 
      post={selectedPost} 
      onClickingDelete={handleDeletingPost}
      onClickingEdit = {handleEditClick} />
      buttonText = 'Return to Post List';
    } else if (formVisibleOnPage) {
      currentlyVisibleState = <NewPostForm 
      onNewPostCreation={handleAddingNewPostToList}/>;
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


export default PostControl;

