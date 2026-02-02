import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';
import Avatar from './Avatar';
import KebabMenu from './KebabMenu';
import EditProfileForm from './EditUserProfileForm';
import {
    InfoSection,
    BioSection,
    ProfileBioLabel,
    BioValue,
    ProfileUsername,
    BioRow,
    ProfileHeader,
    ProfileHeaderInfo
} from '../styles';

function UserDetails(props) {
    const { username, userBio, isEditing, enterEditMode, exitEditMode, onSave, isLoading, isOwnProfile } = props;
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/sign-in');
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    const handleKebabAction = (item) => {
        if (item.id === 'edit') {
            enterEditMode();
        } else if (item.id === 'signout') {
            handleSignOut();
        }
    };

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
            <ProfileHeader>
                <Avatar displayName={username} size="56px" variant="profile" />
                <ProfileHeaderInfo>
                    <ProfileUsername>{username}</ProfileUsername>
                </ProfileHeaderInfo>
                {isOwnProfile && (
                    <KebabMenu
                        items={[
                            { id: 'edit', label: 'Edit Profile' },
                            { id: 'signout', label: 'Sign Out' }
                        ]}
                        onItemClick={handleKebabAction}
                    />
                )}
            </ProfileHeader>
            <BioSection>
                {userBio.bestMeal && (
                    <BioRow>
                        <ProfileBioLabel>Best Meal</ProfileBioLabel>
                        <BioValue>{userBio.bestMeal}</BioValue>
                    </BioRow>
                )}
                {userBio.goToMeals && (
                    <BioRow>
                        <ProfileBioLabel>Repeat Restaurants</ProfileBioLabel>
                        <BioValue>{userBio.goToMeals}</BioValue>
                    </BioRow>
                )}
                {userBio.aboutMe && (
                    <BioRow>
                        <ProfileBioLabel>About</ProfileBioLabel>
                        <BioValue>{userBio.aboutMe}</BioValue>
                    </BioRow>
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