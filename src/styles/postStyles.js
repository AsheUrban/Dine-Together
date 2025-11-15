import styled from 'styled-components';

export const PostContainer = styled.div`
    background-color: #E7DDEE;
    width: 300px;
    margin: auto;
    margin-top: 50px;
    padding: 45px;
    border: 2px solid #fffbc8;
    text-align: center;
    border-radius: 10px;
`;

export const PostListTitle = styled.h1`
    font-size: 30px;
    color: #700629;
    margin: 0;
`;

export const PostName = styled.h2`
    font-size: 26px;
    color: #700629;
`;

export const PostAddress = styled.h3`
    font-size: 22px;
    color: #FFFBC8;
`;

export const PostDetail = styled.p`
    font-style: italic;
    color: #333;
`;

export const PostItem = styled.div`
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

export const PostActionButton = styled.button`
    background-color: #700629;
    border: 2px solid #FFFBC8;
    margin: 10px;
    color: #FFFBC8;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
    
    &:hover {
        background-color: #550420;
    }
`;