import styled from 'styled-components';

export const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-family: 'Rosaline', serif;
    width: ${props => props.size};
    height: ${props => props.size};
    background-color: #F5F1E8;
    border: 3px solid ${props => props.borderColor};
    color: ${props => props.textColor};
    font-size: ${props => props.fontSize};
`;