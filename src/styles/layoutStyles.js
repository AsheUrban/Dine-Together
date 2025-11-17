import styled from 'styled-components';
import { Link } from 'react-router-dom';
import platedfood from '../img/platedfood.jpg';

export const DineTogetherHeader = styled.div`
    text-align: center;
    width: 100vw;
    color: #F5F1E8;
    padding: 25px;
    margin: auto;
    background-color: #8B4513;
    box-sizing: border-box;
`;

export const HeaderNav = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 0;
    font-family: 'Lato', sans-serif;
`;

export const NavLink = styled(Link)`
    color: #F5F1E8;
    text-decoration: none;
    font-family: 'Lato', sans-serif;

    &:hover {
        text-decoration: underline;
    }
`;

export const SignOutButton = styled.button`
    background: none;
    border: none;
    color: #F5F1E8;
    cursor: pointer;
    font-size: 16px;
    font-family: 'Lato', sans-serif;

    &:hover {
        text-decoration: underline;
    }
`;

export const BackgroundStyles = styled.div`
    z-index: -5;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url(${platedfood});
    background-size: cover;
    background-repeat: no-repeat;
    justify-content: space-between;
    align-items: center;
    display: flex;
`;
