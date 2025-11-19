import { useState } from 'react';

export const usePostSelection = () => {
    const [selectedPost, setSelectedPost] = useState(null);

    const handleSelectPost = (post) => {
        setSelectedPost(post);
    }

    const handleBackToList = () => {
        setSelectedPost(null);
    }

    return {
        selectedPost,
        handleSelectPost,
        handleBackToList
    }
}