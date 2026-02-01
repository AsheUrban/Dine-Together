import React from 'react';
import PropTypes from 'prop-types';
import { AvatarContainer, AvatarInner } from '../styles/avatarStyles';

function Avatar({ displayName, size = '44px', variant = 'default' }) {
    const getInitials = (name) => {
        if (!name) return ' ';
        return name
            .split(' ')
            .map(word => word[0].toUpperCase())
            .join('')
            .slice(0, 2);
    };

    // Size configurations based on design guide
    const sizeConfigs = {
        '32px': { fontSize: '14px', ringWidth: '2px' },
        '36px': { fontSize: '16px', ringWidth: '3px' },
        '44px': { fontSize: '20px', ringWidth: '3px' },
        '56px': { fontSize: '24px', ringWidth: '3px' },
        '80px': { fontSize: '32px', ringWidth: '4px' },
    };

    const config = sizeConfigs[size] || { fontSize: '20px', ringWidth: '3px' };

    // Inner background can vary by context
    const innerBg = variant === 'header' ? '#FFFFFF' : '#F5F1E8';

    return (
        <AvatarContainer size={size} ringWidth={config.ringWidth}>
            <AvatarInner fontSize={config.fontSize} innerBg={innerBg}>
                {getInitials(displayName)}
            </AvatarInner>
        </AvatarContainer>
    );
}

Avatar.propTypes = {
    displayName: PropTypes.string.isRequired,
    size: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'header', 'profile'])
};

export default Avatar;
