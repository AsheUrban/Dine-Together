import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types'; 
import ReusableForm from './ReusableForm';
import { serverTimestamp } from "firebase/firestore";
import { validatePost } from '../utils/validators';

function NewPostForm(props){
  const [errors, setErrors] = useState({});

  function handleNewPostFormSubmission(event) {
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

    props.onNewPostCreation({
      userId: props.userId,
      placeId: placeId,
      restaurantName: restaurantName,
      notes: notes,
      timeOpen: serverTimestamp()
    });
  }

  return (
    <React.Fragment>
      <ReusableForm 
        onSubmit={handleNewPostFormSubmission}
        buttonText='Add Restaurant'
      errors={errors} />
    </React.Fragment>
  );
}

NewPostForm.propTypes = {
  onNewPostCreation: PropTypes.func,
  userId: PropTypes.string
};

export default NewPostForm;
