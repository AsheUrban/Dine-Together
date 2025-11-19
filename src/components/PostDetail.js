import React from 'react';
import PropTypes from 'prop-types';
import EditPostForm from './EditPostForm';
import { auth } from '../firebase.js';
import { useState } from 'react';
import { PostContainer, H2Centered, H4, PostActionButton } from '../styles';
import { updatePost, deletePost } from '../services/firebaseService';

function PostDetail(props){
    const { post, onBack } = props;
    const [editing, setEditing] = useState(false);
    const isOwner = auth.currentUser.uid === post.userId;
    const handleEditClick = () => {
        setEditing(true);
    }

    const handleEditingPost = async (postToEdit) => {
        await updatePost(postToEdit);
        setEditing(false);
    }

    const handleDelete = async (id) => {
        await deletePost(id);
        onBack();
    }

    if(editing) {
        return (
                <EditPostForm
                    post={post}
                    onEditPost={handleEditingPost}
                    userId={post.userId}
                    onBack={onBack}
                    onDelete={handleDelete}
                />
        );
    }

    return (
        <React.Fragment>
            <PostContainer>
                <H2Centered>{post.restaurantName}</H2Centered>
                <H4>{post.restaurantAddress}</H4>
                <p><em>{post.notes}</em></p>
                {isOwner && <PostActionButton onClick={handleEditClick}>Edit</PostActionButton>}
                <PostActionButton onClick={onBack}>Back</PostActionButton>
            </PostContainer>
        </React.Fragment>
    );
}

PostDetail.propTypes = {
    post: PropTypes.object,
    onBack: PropTypes.func
};

export default PostDetail;
