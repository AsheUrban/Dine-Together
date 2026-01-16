import React from 'react';
import PropTypes from 'prop-types';
import { AvatarContainer } from '../styles/avatarStyles';

function Avatar({ displayName, size = '48px', variant = 'header' }) {
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0].toUpperCase())
            .join('')
            .slice(0, 2);
    };

    const colorSchemes = {
        header: {
            borderColor: '#D98560',
            textColor: '#D98560'
        },
        profile: {
            borderColor: '#8B4513',
            textColor: '#8B4513'
        }
    };
    
    const scheme = colorSchemes[variant] || colorSchemes.header;
    
    const sizeMap = {
        '48px': '24px',
        '50px': '30px',
        '100px': '40px',
        '120px': '48px'
    };

    const fontSize = sizeMap[size] || '20px';

    return (
        <AvatarContainer
            size={size}
            borderColor={scheme.borderColor}
            textColor={scheme.textColor}
            fontSize={fontSize}
            >
                {getInitials(displayName)}
            </AvatarContainer>
    );
}

Avatar.propTypes = {
    displayName: PropTypes.string.isRequired,
    size: PropTypes.string,
    variant: PropTypes.oneOf(['header', 'profile'])
};

export default Avatar;