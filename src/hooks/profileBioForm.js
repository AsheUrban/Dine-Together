import { useEditMode } from '../hooks/editMode';
import { useFormSubmit } from '../hooks/formSubmit.js';
import { auth } from './../firebase.js';
import { updateUserBio } from '../services/firebaseService.js';


export const useProfileData = (onBioUpdate) => {
    const { isEditing, enterEditMode, exitEditMode } = useEditMode();
    const { isLoading, handleSubmit } = useFormSubmit(async (bioData) => {
        try {
            await updateUserBio(auth.currentUser.uid, bioData);
            onBioUpdate(bioData);
            exitEditMode();
        } catch (err) {
            console.error('Error updating bio:', err);
        }
    });

    return {
        isEditing,
        enterEditMode,
        exitEditMode,
        isLoading,
        handleSubmit
    }
}