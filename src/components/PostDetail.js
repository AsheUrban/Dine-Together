import React from 'react';
import PropTypes from 'prop-types';
import { PostContainer, PostListTitle, PostAddress, PostActionButton } from '../styles';

function PostDetail(props){
  const { post, onClickingDelete, onClickingEdit } = props; 

  

  return (
    <React.Fragment>
        <PostContainer>
        <PostListTitle>Restaurant Details</PostListTitle>
        <hr />
        <PostListTitle>{post.restaurantName}</PostListTitle>
        <PostAddress>{post.restaurantAddress}</PostAddress>
        <p><em>{post.reservationNotes}</em></p>
        <PostActionButton onClick={onClickingEdit}>Update Restaurant</PostActionButton>
        <PostActionButton onClick={()=> onClickingDelete(post.id)}>Delete Restaurant</PostActionButton>
        </PostContainer>
    </React.Fragment>
  );
}

PostDetail.propTypes = {
  post: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func 
};

export default PostDetail;