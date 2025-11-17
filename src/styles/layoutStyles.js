import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DineTogetherHeader = styled.div`
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

export const BackgroundStyles = styled.div`
    background-color: #F5F1E8;
    min-height: 100vh;
    padding: 40px 20px;
`;
