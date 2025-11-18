import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DineTogetherPosts = styled.div`
    background-color: #F5F1E8;
    width: 350px;
    margin: auto;
    margin-top: 50px;
    padding: 60px;
    border: 2px solid #D4A574;
    text-align: center;
    border-radius: 10px;
`;

export const Input = styled.input`
    border-radius: 5px;
    border: 1px solid #2C2C2C;
    margin: auto;
    margin-bottom: 10px;
    font-family: 'Lato', sans-serif;
    color: #2C2C2C;
    padding: 8px;
`;

export const TextArea = styled.textarea`
    border-radius: 5px;
    border: 1px solid #2C2C2C;
    margin: auto;
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    font-family: 'Lato', sans-serif;
    color: #2C2C2C;
`;

export const Button = styled.button`
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
    }
`;

export const H1 = styled.h1`
    font-size: 59px;
    color: #F5F1E8;
    margin: 0;
    font-family: 'Rosaline', serif;
`;

export const H2 = styled.h2`
    font-size: 35px;
    color: #8B4513;
    font-family: 'Rosaline', serif;
    margin: 10px 0;
`;

export const H3 = styled.h3`
    font-size: 35px;
    color: #8B4513;
    font-family: 'Lato', sans-serif;
    margin: 10px 0;
`;

export const H4 = styled.h4`
    font-size: 18px;
    color: #8B4513;                    // ← CHANGED: burnt peach → saddle brown
    font-family: 'Lato', sans-serif;
    margin: 5px 0;
`;

export const H5 = styled.h5`            // ← ADDED: New H5 for accent details
    font-size: 18px;
    color: #D98560;
    font-family: 'Lato', sans-serif;
    margin: 5px 0;
`;

export const SignUpLink = styled(Link)`
    color: #8B4513;
    text-decoration: none;
    font-family: 'Lato', sans-serif;

    &:hover {
        text-decoration: underline;
    }
`;

export const Center = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    width: 1230px;
    color: #2C2C2C;
    padding: 25px;
    margin: auto;
    font-family: 'Lato', sans-serif;
`;
