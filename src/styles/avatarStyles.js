import styled from 'styled-components';

// Design system colors
const colors = {
    bg: '#FFFFFF',
    card: '#F5F1E8',
    text: '#3D3328',
    accent: '#C4663D',
    warm: '#D4956A',
    olive: '#8B956A',
};

export const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: ${props => props.size};
    height: ${props => props.size};
    background: conic-gradient(from 45deg, ${colors.accent}, ${colors.warm}, ${colors.olive}, ${colors.accent});
    padding: ${props => props.ringWidth || '3px'};
    flex-shrink: 0;
`;

export const AvatarInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: ${props => props.innerBg || colors.card};
    font-family: 'Rosaline', serif;
    color: ${colors.text};
    font-size: ${props => props.fontSize};
`;
