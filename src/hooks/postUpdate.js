    import { useCallback } from 'react';
    
    export const usePostUpdate = (setMainPostList, selectedPost, handleSelectPost) => {
        const handlePostUpdate = useCallback((updatedPost) => {
            setMainPostList(prevList =>
                prevList.map(post => post.id === updatedPost.id ? { ...post, ...updatedPost } : post)
            );
            if(selectedPost && selectedPost.id === updatedPost.id) {
                handleSelectPost({ ...selectedPost, ...updatedPost });
            }
        }, [setMainPostList, selectedPost, handleSelectPost]);

        return handlePostUpdate;
    }      