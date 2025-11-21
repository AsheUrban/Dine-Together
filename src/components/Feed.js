import React from 'react';
import PostList from './PostList';
import PlaceDetail from './PlaceDetail';
import { auth } from '../firebase.js';
import { FormContainer, H1 } from '../styles';
import { useAllPosts } from '../hooks/allPosts.js';
import { usePlaceSelection } from '../hooks/placeSelection.js';

function Feed () {
  const { posts, error } = useAllPosts();
  const { selectedPlace, handleSelectPlace, handleBackToList } = usePlaceSelection();

  const handleChangingSelectedPlace = (id) => {
    const selection = posts.filter(post => post.id === id)[0];
    handleSelectPlace(selection);
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

  if (selectedPlace) {
    return (
      <PlaceDetail
      place={selectedPlace}
      onBack={handleBackToList}
      />
    );
  }

  return (
    <PostList
      onPostSelection={handleChangingSelectedPlace}
      postList={posts}
    />
  );
}

export default Feed;
