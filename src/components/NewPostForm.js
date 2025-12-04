import React from 'react';
import PropTypes from 'prop-types';
import ReusablePostForm from './ReusablePostForm';
import { serverTimestamp } from "firebase/firestore";

function NewPostForm(props) {
    const handleSubmit = (postData) => {
        props.onNewPostCreation({
            ...postData,
            placeId: props.placeId,
            userId: props.userId
        });
    };

    return (
        <ReusablePostForm
            onSubmit={handleSubmit}
            buttonText='Create Post'
        />
    );
}

NewPostForm.propTypes = {
    onNewPostCreation: PropTypes.func.isRequired,
    placeId: PropTypes.string.isRequired,
    userId: PropTypes.string
};

export default NewPostForm;
