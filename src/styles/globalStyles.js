import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Typography
export const H1 = styled.h1`
    font-size: 59px;
    color: #F5F1E8;
    margin: 0;
    font-family: 'Rosaline', serif;
`;

export const H2 = styled.h2`
    font-size: 30px;
    color: #8B4513;
    font-family: 'Rosaline', serif;
    margin: 10px 0;
    margin-bottom: 0px;
`;

export const H2Centered = styled.h2`
    font-size: 30px;
    text-align: center;
    color: #8B4513;
    font-family: 'Rosaline', serif;
    margin: 10px 0;
`;

export const H3 = styled.h3`
    font-size: 35px;
    color: #8B4513;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    margin: 10px 0;
`;

export const H3Centered = styled.h3`
    font-size: 35px;
    text-align: center;
    color: #8B4513;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    margin: 10px 0;
`;

export const H4 = styled.h4`
    font-size: 18px;
    color: #8B4513;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    margin: 5px 0;
`;

export const H4Centered = styled.h4`
    font-size: 18px;
    color: #8B4513;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    margin: 5px 0;
`;

export const H5 = styled.h5`
    font-size: 18px;
    color: #D98560;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    margin: 5px 0;
`;

// Header/Navigation
export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    color: #F5F1E8;
    padding: 25px 40px;
    margin: auto;
    background-color: #8B4513;
    box-sizing: border-box;
`;

export const HeaderLogo = styled.div`
    flex: 0 0 auto;
`;

export const HeaderNav = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
    flex: 1;
    font-family: 'Lato', sans-serif;
`;

export const HeaderProfile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    flex: 0 0 auto;
`;

export const NavLink = styled(Link)`
    color: #F5F1E8;
    text-decoration: none;
    font-family: 'Lato', sans-serif;
    font-size: 16px;

    &:hover {
        text-decoration: underline;
    }
`;

export const SignOutButton = styled.button`
    background: none;
    border: none;
    color: #F5F1E8;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Lato', sans-serif;
    padding: 0;

    &:hover {
        text-decoration: underline;
    }
`;

// Buttons
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

export const LinkStyle = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #8B4513;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    padding: 0;
    transition: color 0.2s ease;

    &:hover {
        color: #D98560;
    }
`;

// Background
export const BackgroundStyles = styled.div`
    background-color: #F5F1E8;
    min-height: 100vh;
    padding: 40px 20px;
`;

// General Utilities
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
