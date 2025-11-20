import React from 'react';
import PropTypes from 'prop-types'; 
import ReusableForm from './ReusablePostForm';
import { serverTimestamp } from "firebase/firestore";

function NewPostForm(props){
  const handleSubmit = (postData) => {
      props.onNewPostCreation({
          ...postData,
          userId: props.userId,
          timeOpen: serverTimestamp()
      });
  };
    
  return (
      <ReusableForm 
        onSubmit={handleSubmit}
        buttonText='Add Restaurant'
      />
  );
}

NewPostForm.propTypes = {
  onNewPostCreation: PropTypes.func.isRequired,
  userId: PropTypes.string
};

export default NewPostForm;
