import React from 'react';
import PropTypes from 'prop-types';
import ReusableProfileForm from './ReusableProfileForm';

function EditProfileForm(props) {
    const { userBio, onSave, onBack, isLoading } = props;

    return (
        <ReusableProfileForm
            userBio={userBio}
            onSave={onSave}
            onBack={onBack}
            isLoading={isLoading}
            buttonText="Save"
        />
    );
}

EditProfileForm.propTypes = {
    userBio: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};