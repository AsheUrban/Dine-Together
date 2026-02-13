import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from './PostList';
import EditPostForm from './EditPostForm';
import ConfirmDialog from './ConfirmDialog';
import { auth } from '../firebase.js';
import { FormContainer, H1 } from '../styles';
import { useAllPosts } from '../hooks/allPosts';
import { deletePost, updatePostCaption } from '../services/firebaseService';

function Feed() {
    const navigate = useNavigate();
    const { posts, error, loading } = useAllPosts();
    const [editingPostId, setEditingPostId] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        isOpen: false,
        message: '',
        postId: null,
    });

    const selectPlaceFromPost = (postId, place, authorId) => {
        navigate(`/place/${place.id}`);
    };

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
    };

    const handleEditPost = (postId) => {
        setEditingPostId(postId);
    };

    const handleDeletePost = (postId) => {
        setDeleteConfirmation({
            isOpen: true,
            message: 'Are you sure you want to delete this post?',
            postId: postId,
        });
    };

    const confirmDeletePost = async () => {
        await deletePost(deleteConfirmation.postId);
        setDeleteConfirmation({
            isOpen: false,
            message: '',
            postId: null,
        });
    };

    const handleSaveEditPost = async (postData) => {
        await updatePostCaption(postData.id, postData.caption);
        setEditingPostId(null);
    };

    if (auth.currentUser == null) {
        return (
            <FormContainer>
                <H1>You must be signed in to access the feed.</H1>
            </FormContainer>
        );
    }

    if (loading) {
        return null;
    }

    if (error) {
        return <div>There was an error: {error}</div>;
    }

    if (editingPostId) {
        return (
            <EditPostForm
                post={posts.find((p) => p.id === editingPostId)}
                onEditPost={handleSaveEditPost}
                onBack={() => setEditingPostId(null)}
            />
        );
    }

    const postsWithOwnership = posts.map((post) => ({
        ...post,
        isOwner: post.userId === auth.currentUser.uid,
    }));

    return (
        <>
            <PostList
                onPostSelection={selectPlaceFromPost}
                postList={postsWithOwnership}
                onEditPost={handleEditPost}
                onDeletePost={handleDeletePost}
                onUserClick={handleUserClick}
            />
            {deleteConfirmation.isOpen && (
                <ConfirmDialog
                    isOpen={deleteConfirmation.isOpen}
                    message={deleteConfirmation.message}
                    onConfirm={confirmDeletePost}
                    onCancel={() =>
                        setDeleteConfirmation({
                            isOpen: false,
                            message: '',
                            postId: null,
                        })
                    }
                />
            )}
        </>
    );
}

export default Feed;
