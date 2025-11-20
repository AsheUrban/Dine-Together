import React from 'react';
import PropTypes from 'prop-types';
import ReusablePostForm from './ReusablePostForm';
import { PostActionButton } from '../styles';

//logic for handleEditingPost is in PostDetail.js

function EditPostForm (props) {
  const { post, onBack, onDelete } = props;
  
  const handleSubmit = (postData) => {
        props.onEditPost({
            ...postData,
            id: post.id
        });
    };

  return (
      <ReusablePostForm 
        onSubmit={handleSubmit} 
        buttonText="Save"
        restaurantName={post.restaurantName}
        placeId={post.placeId}
        notes={post.notes}
        cancelButton={<PostActionButton onClick={onBack}>Cancel</PostActionButton>}
        deleteButton={<PostActionButton onClick={()=> onDelete(post.id)}>Delete</PostActionButton>}
      />
    );
}

EditPostForm.propTypes = {
  onEditPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default EditPostForm;
