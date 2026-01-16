import React from 'react';
import PropTypes from 'prop-types';
import ReusablePostForm from './ReusablePostForm';
import { CircularButton } from '../styles';

function EditPostForm(props) {
    const { post, onBack } = props;

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
            backButton={<CircularButton onClick={onBack}>↩</CircularButton>}
        />
    );
}

EditPostForm.propTypes = {
    onEditPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default EditPostForm;
