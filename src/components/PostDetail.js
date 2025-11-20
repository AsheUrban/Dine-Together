import React from 'react';
import PropTypes from 'prop-types';
import EditPostForm from './EditPostForm';
import { auth } from '../firebase.js';
import { PostContainer, H3Centered, H4, PostActionButton } from '../styles';
import { updatePost, deletePost } from '../services/firebaseService';
import { useEditMode } from '../hooks/editMode';
import { useDeleteConfirmation } from '../hooks/deleteConfirmation';

function PostDetail(props){
    const { post, onBack, onPostUpdate } = props;
    const { isEditing, enterEditMode, exitEditMode } = useEditMode();
    const { confirmDelete } = useDeleteConfirmation();
    const isOwner = auth.currentUser.uid === post.userId;

    const handleEditingPost = async (postToEdit) => {
        await updatePost(postToEdit);
        if(onPostUpdate) {
            onPostUpdate(postToEdit);
        }
        exitEditMode();
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this restuarant?');
        if(confirmed) {
            await confirmDelete(async () => {
                await deletePost(id);
                onBack();
            });
        }
    }

    if(isEditing) {
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
                <H3Centered>{post.restaurantName}</H3Centered>
                <H4>{post.restaurantAddress}</H4>
                <p><em>{post.notes}</em></p>
                {isOwner && <PostActionButton onClick={enterEditMode}>Edit</PostActionButton>}
                <PostActionButton onClick={onBack}>Back</PostActionButton>
            </PostContainer>
        </React.Fragment>
    );
}

PostDetail.propTypes = {
    post: PropTypes.object,
    onBack: PropTypes.func,
    onPostUpdate: PropTypes.func
};

export default PostDetail;
