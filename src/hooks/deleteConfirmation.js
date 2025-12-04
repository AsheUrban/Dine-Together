import { useState } from 'react';

export const useDeleteConfirmation = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const openConfirmation = () => {
        setShowConfirmation(true);
    };

    const closeConfirmation = () => {
        setShowConfirmation(false);
    };

    const confirmDelete = async (onDelete) => {
        try {
            await onDelete();
            closeConfirmation();
        } catch (err) {
            throw err;
        }
    };

    return { showConfirmation, openConfirmation, closeConfirmation, confirmDelete };
};
