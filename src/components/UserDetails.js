import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import EditProfileForm from './EditUserProfileForm';
import {
    H2,
    BioText,
    BioLabel,
    EditProfileLink,
    InfoSection,
    BioSection,
} from '../styles';

function UserDetails(props) {
    const { username, userBio, isEditing, enterEditMode, exitEditMode, onSave, isLoading, isOwnProfile } = props;

    if(isEditing) {
        return (
                <InfoSection>
                    <EditProfileForm
                        userBio={userBio}
                        onSave={onSave}
                        onBack={exitEditMode}
                        isLoading={isLoading}
                    />
                </InfoSection>
        );
    }

    return (
        <InfoSection>
            <Avatar displayName={username} variant="profile" />
                <H2>{username}</H2>
                {isOwnProfile && (
                    <EditProfileLink href="#edit" onClick={(e) => { 
                        e.preventDefault(); 
                        enterEditMode(); 
                        }}>edit profile
                    </EditProfileLink>
                )}
            <BioSection>
                {userBio.bestMeal && <BioText><BioLabel>Best Meal:</BioLabel>{userBio.bestMeal}</BioText>}
                {userBio.goToMeals && <BioText><BioLabel>Repeat Restaurants:</BioLabel>{userBio.goToMeals}</BioText>}
                {userBio.aboutMe && <BioText><BioLabel>About:</BioLabel>{userBio.aboutMe}</BioText>}
            </BioSection>
        </InfoSection>
    );
}

UserDetails.propTypes = {
    username: PropTypes.string.isRequired,
    userBio: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    enterEditMode: PropTypes.func.isRequired,
    exitEditMode: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isOwnProfile: PropTypes.bool.isRequired
};

export default UserDetails;