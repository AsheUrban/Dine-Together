import { useState } from 'react';

export const useFormSubmit = (onSubmit) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (data) => {
        try {
            setIsLoading(true);
            setError(null);
            await onSubmit(data);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };
    return { isLoading, error, handleSubmit };
};