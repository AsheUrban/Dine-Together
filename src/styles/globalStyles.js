import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Typography
export const H1 = styled.h1`
    font-size: 48px;
    color: #F5F1E8;
    margin: 0;
    font-family: 'Rosaline', serif;
`;

export const H1Centered = styled.h1`
    font-size: 48px;
    text-align: center;
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
    font-weight: 400;
    margin: 10px 0;
`;

export const H3Centered = styled.h3`
    font-size: 35px;
    text-align: center;
    color: #8B4513;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    margin: 10px 0;
`;

export const H4 = styled.h4`
    font-size: 24px;
    color: #8B4513;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    margin: 5px 0;
`;

export const H4Centered = styled.h4`
    font-size: 24px;
    text-align: center;
    color: #8B4513;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    margin: 5px 0;
`;

export const H5 = styled.h5`
    font-size: 18px;
    color: #D98560;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    margin: 5px 0;
`;

export const H6 = styled.h6`
    font-size: 12px;
    color: #2C2C2C;
    font-family: 'Lato', sans-serif;
    font-style: italic;
    font-weight: 300;
    text-decoration: underline;
    margin: 5px 0;
`;

export const H6Centered = styled.h6`
    font-size: 12px;
    text-align: center;
    color: #2C2C2C;
    font-family: 'Lato', sans-serif;
    font-style: italic;
    font-weight: 300;
    text-decoration: underline;
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
    margin-bottom: 10px;
    background-color: #8B4513;
    box-sizing: border-box;
`;

export const HeaderLogo = styled.div`
    flex: 0 0 auto;
`;

export const HeaderNav = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: auto;
    font-family: 'Lato', sans-serif;
`;

export const HeaderProfile = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    flex: 0 0 auto;
`;

export const NavLink = styled(Link)`
    color: #F5F1E8;
    text-decoration: none;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 400;
    opacity: 0.8;

    &:hover {
        opacity: 1;
    }
`;

export const SignOutButton = styled.button`
    background: none;
    border: none;
    color: #F5F1E8;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    padding: 0;
    opacity: 0.8;

    &:hover {
        opacity: 1;
    }
`;

// Buttons
export const Button = styled.button`
    background-color: #8B4513;
    border: 2px solid #D98560;
    margin: 0;
    color: #F5F1E8;
    padding: 8px 20px;
    text-align: center;
    text-decoration: none;
    display: inline;
    font-size: 14px;
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
    background-color: #FFFFFF;
    min-height: 100vh;
    padding: 0;
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

export const GlobalContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    height: fit-content;
    width: 100%;
    // padding-top: 10px;
`;

// ConfirmDialog Components
export const ConfirmDialogOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ConfirmDialogContainer = styled.div`
    background-color: #F5F1E8;
    border: 2px solid #8B4513;
    padding: 40px;
    max-width: 400px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
`;

export const ConfirmDialogMessage = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    color: #2C2C2C;
    margin: 0 0 30px 0;
    line-height: 1.6;
`;

export const ConfirmDialogButtons = styled.div`
    display: flex;
    gap: 15px;
    justify-content: center;
`;

export const ConfirmDialogButton = styled.button`
    background-color: ${props => props.danger ? '#8B4513' : '#D4A574'};
    border: 2px solid ${props => props.danger ? '#D98560' : '#8B4513'};
    color: ${props => props.danger ? '#F5F1E8' : '#2C2C2C'};
    padding: 12px 28px;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: ${props => props.disabled ? 0.6 : 1};
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};

    &:hover {
        background-color: ${props => props.danger ? '#D98560' : '#8B4513'};
        color: ${props => props.danger ? '#2C2C2C' : '#F5F1E8'};
    }
`;

// KebabMenu Components
export const KebabMenuButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #D98560;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
    position: relative;

    &:hover {
        color: #8B4513;
    }
`;

export const KebabMenuContainer = styled.div`
    position: relative;
`;

export const KebabMenuDropdown = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #F5F1E8;
    border: 2px solid #D98560;
    min-width: 150px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
    margin-top: 4px;
`;

export const KebabMenuItem = styled.button`
    width: 100%;
    background: none;
    border: none;
    padding: 12px 16px;
    text-align: left;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: #2C2C2C;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #D98560;
        color: #F5F1E8;
    }
`;

// Circular Button (base - no positioning)
export const CircularButton = styled.button`
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #F5F1E8;
    border: 2px solid #D98560;
    color: #D98560;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #D98560;
        border-color: #D98560;
        color: #F5F1E8;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

// ActionBar Container
export const ActionBarContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #F5F1E8;
    border-top: 2px solid #8B4513;
    padding: 15px 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    z-index: 100;
`;
