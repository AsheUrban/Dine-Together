import React from 'react';
import PropTypes from 'prop-types';
import ReusablePostForm from './ReusablePostForm';
import { PlaceActionButton } from '../styles';

function EditPostForm(props) {
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
            buttonText='Save'
            caption={post.caption}
            cancelButton={<PlaceActionButton onClick={onBack}>Cancel</PlaceActionButton>}
            deleteButton={<PlaceActionButton onClick={() => onDelete(post.id)}>Delete</PlaceActionButton>}
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
