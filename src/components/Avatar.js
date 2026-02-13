import PropTypes from 'prop-types';
import { AvatarContainer, AvatarInner } from '../styles/avatarStyles';

function Avatar({ displayName, size = '44px' }) {
    const getInitials = (name) => {
        if (!name) return ' ';
        return name
            .split(' ')
            .map((word) => word[0].toUpperCase())
            .join('')
            .slice(0, 2);
    };

    const sizeConfigs = {
        '32px': { fontSize: '14px' },
        '36px': { fontSize: '16px' },
        '44px': { fontSize: '18px' },
        '56px': { fontSize: '24px' },
        '80px': { fontSize: '32px' },
    };

    const config = sizeConfigs[size] || { fontSize: '18px' };

    return (
        <AvatarContainer size={size}>
            <AvatarInner fontSize={config.fontSize}>
                {getInitials(displayName)}
            </AvatarInner>
        </AvatarContainer>
    );
}

Avatar.propTypes = {
    displayName: PropTypes.string.isRequired,
    size: PropTypes.string,
};

export default Avatar;
