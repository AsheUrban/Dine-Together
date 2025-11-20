import styled from 'styled-components';

export const PostContainer = styled.div`
    background-color: #F5F1E8;
    width: 350px;
    margin: auto;
    margin-top: 50px;
    padding: 45px;
    border: 2px solid #D4A574;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const PostWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    height: fit-content;
    width: 100%;
`;

export const PostItem = styled.div`
    background-color: #F5F1E8;
    border: 2px solid #D98560;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    box-sizing: border-box;
    margin-top: 20px;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.8;
    }
`;

export const PostContent = styled.div`
    display: flex;
    gap: 15px;
    align-items: flex-start;
`;

export const PostImage = styled.div`
    width: 100px;
    height: 100px;
    min-width: 100px;
    background-color: #D4A574;
    border-radius: 8px;
    flex-shrink: 0;
`;

export const PostDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
`;

export const PostedDate = styled.p`
    font-size: 14px;
    color: #8B4513;
    margin-top: 0px;
    margin-bottom: 0;
    margin-left: 0;
    font-family: 'Lato', sans-serif;
    font-style: italic;
    text-align: left;
`;

export const PostGridStyles = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
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
