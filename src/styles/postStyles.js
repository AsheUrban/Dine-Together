import styled from 'styled-components';

export const PostContainer = styled.div`
    background-color: #F5F1E8;
    width: 300px;
    margin: auto;
    margin-top: 50px;
    padding: 45px;
    border: 2px solid #D4A574;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const PostItem = styled.div`
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.8;
    }
`;

export const PostActionButton = styled.button`
    background-color: #8B4513;
    border: 2px solid #D98560;
    margin: 10px;
    color: #F5F1E8;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    transition: all 0.2s ease;

    &:hover {
        background-color: #D98560;
        color: #2C2C2C;
        border-color: #8B4513;
    }
`;
