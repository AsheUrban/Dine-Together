import styled from 'styled-components';
import { Link } from 'react-router-dom';
import platedfood from '../img/platedfood.jpg';

export const DineTogetherHeader = styled.div`
    text-align: center;
    width: 100vw;
    color: #FFFBC8;
    padding: 25px;
    margin: auto;
    background-color: #B16825;
    box-sizing: border-box;
`;

export const HeaderTitle = styled.h1`
    font-size: 59px;
    margin: 0;
`;

export const HeaderNav = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 0;
`;

export const NavLink = styled(Link)`
    color: #FFFBC8;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export const SignOutButton = styled.button`
    background: none;
    border: none;
    color: #FFFBC8;
    cursor: pointer;
    font-size: 16px;
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
