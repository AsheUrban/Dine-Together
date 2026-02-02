import styled from 'styled-components';

const colors = {
    bg: '#FFFFFF',
    text: '#000000',
    border: '#000000',
};

const fonts = {
    primary: 'Courier, monospace',
};

export const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: ${props => props.size};
    height: ${props => props.size};
    border: 1px solid ${colors.border};
    background-color: ${colors.bg};
    flex-shrink: 0;
`;

export const AvatarInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    font-family: ${fonts.primary};
    color: ${colors.text};
    font-size: ${props => props.fontSize};
    font-weight: 700;
`;
