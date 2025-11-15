export const validatePost = (placeId, restaurantName, notes) => {
    const errors = {};

    if(!placeId || placeId.trim() === '') {
        errors.placeId = 'Please select a restaurant from the search results.';
    }

    if(!restaurantName.trim()) {
        errors.restaurantName = 'Restaurant name is required';
    }

    if(notes && !notes.trim()) {
        errors.notes = 'Notes cannot be empty.';
    } else if (notes && notes.length > 200) {
        errors.notes = 'Notes cannot exceed 200 characters.';
    }

    return Object.keys(errors).length === 0 ? null : errors;
};

