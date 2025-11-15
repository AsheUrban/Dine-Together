import React from 'react';
import { useState } from 'react';
import ReusableForm from './ReusableForm';
import PropTypes from 'prop-types';
import { validatePost } from '../utils/validators';

function EditPostForm (props) {
  const { post } = props;
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

    props.onEditPost({
      userId: props.userId,
      placeId: placeId,
      restaurantName: event.target.restaurantName.value,
      notes: event.target.notes.value,
      id: post.id
    });
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditPostFormSubmission} 
        buttonText='Update Restaurant' 
        errors={errors} />
    </React.Fragment>
  );
}

EditPostForm.propTypes = {
  onEditPost: PropTypes.func,
  post: PropTypes.object,
  userId: PropTypes.string
};

export default EditPostForm;
