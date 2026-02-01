import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import EditProfileForm from './EditUserProfileForm';
import {
    EditProfileLink,
    InfoSection,
    BioSection,
    ProfileBioLabel,
    BioValue,
    ProfileUsername
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
            <ProfileUsername>{username}</ProfileUsername>
            {isOwnProfile && (
                <EditProfileLink href="#edit" onClick={(e) => {
                    e.preventDefault();
                    enterEditMode();
                }}>edit profile
                </EditProfileLink>
            )}
            <BioSection>
                {userBio.bestMeal && (
                    <div>
                        <ProfileBioLabel>Best Meal</ProfileBioLabel>
                        <BioValue>{userBio.bestMeal}</BioValue>
                    </div>
                )}
                {userBio.goToMeals && (
                    <div>
                        <ProfileBioLabel>Repeat Restaurants</ProfileBioLabel>
                        <BioValue>{userBio.goToMeals}</BioValue>
                    </div>
                )}
                {userBio.aboutMe && (
                    <div>
                        <ProfileBioLabel>About</ProfileBioLabel>
                        <BioValue>{userBio.aboutMe}</BioValue>
                    </div>
                )}
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