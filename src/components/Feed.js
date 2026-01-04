import React, { useState } from 'react';
import PostList from './PostList';
import PlaceDetail from './PlaceDetail';
import EditPostForm from './EditPostForm.js';
import ConfirmDialog from './ConfirmDialog.js';
import { auth } from '../firebase.js';
import { FormContainer, H1 } from '../styles';
import { useAllPosts } from '../hooks/allPosts.js';
import { usePlaceSelection } from '../hooks/placeSelection.js';
import { deletePost, updatePostCaption } from '../services/firebaseService.js';

function Feed () {
  const { posts, error } = useAllPosts();
  const { selectedPlace, handleSelectPlace, handleBackToList } = usePlaceSelection();
  const [editingPostId, setEditingPostId] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
      isOpen: false,
      message: '',
      postId: null
  });

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

  if (selectedPlace) {
    return (
      <PlaceDetail
      place={selectedPlace}
      onBack={handleBackToList}
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
    <React.Fragment>
        <PostList
          onPostSelection={selectPlaceFromPost}
          postList={postsWithOwnership}
          onEditPost={handleEditPost}
          onDeletePost={handleDeletePost}
        />
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
    </React.Fragment>
  );
}

export default Feed;
