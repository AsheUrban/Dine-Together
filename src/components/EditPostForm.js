import React from 'react';
import ReusableForm from './ReusableForm';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { validatePost } from '../utils/validators';
import { useFormSubmit } from '../hooks/formSubmit';
import { PostActionButton } from '../styles';

function EditPostForm (props) {
  const { post, onBack, onDelete } = props;
  const { isLoading, error: submitError, handleSubmit } = useFormSubmit(props.onEditPost);
    const [errors, setErrors] = useState({});

  function handleEditPostFormSubmission(event) {
    event.preventDefault();
    const placeId = event.target.placeId.value;
    const restaurantName = event.target.restaurantName.value;
    const notes = event.target.notes.value;

    const validationErrors = validatePost(placeId, restaurantName, notes);

    if(validationErrors) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    handleSubmit({
      userId: props.userId,
      placeId: placeId,
      restaurantName: event.target.restaurantName.value,
      notes: event.target.notes.value,
      id: post.id
    });
  }

  return (
    <React.Fragment>
      {submitError && <p style={{color: 'red'}}>{submitError}</p>}
      <ReusableForm 
        onSubmit={handleEditPostFormSubmission} 
        buttonText={isLoading ? 'Saving...' : 'Save'}
        errors={errors} 
        restaurantName={post.restaurantName}
        placeId={post.placeId}
        notes={post.notes}
        cancelButton={<PostActionButton onClick={onBack}>Cancel</PostActionButton>}
        deleteButton={<PostActionButton onClick={async ()=> { await onDelete(post.id); }}>Delete</PostActionButton>}
        disabled={isLoading}
        />
    </React.Fragment>
  );
}

EditPostForm.propTypes = {
  onEditPost: PropTypes.func,
  post: PropTypes.object,
  userId: PropTypes.string,
  onBack: PropTypes.func,
  onDelete: PropTypes.func
};

export default EditPostForm;
