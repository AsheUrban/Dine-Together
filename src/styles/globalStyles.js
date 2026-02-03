import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, fonts } from './theme';

// Typography
export const H1 = styled.h1`
    font-size: 18px;
    color: ${colors.text};
    margin: 0;
    font-family: ${fonts.primary};
    font-weight: 700;
    letter-spacing: 0.1em;
`;

export const H1Centered = styled.h1`
    font-size: 18px;
    text-align: center;
    color: ${colors.text};
    margin: 0;
    font-family: ${fonts.primary};
    font-weight: 700;
    letter-spacing: 0.1em;
`;

export const H2 = styled.h2`
    font-size: 20px;
    color: ${colors.text};
    font-family: ${fonts.primary};
    font-weight: 700;
    margin: 0;
`;

export const H2Centered = styled.h2`
    font-size: 20px;
    text-align: center;
    color: ${colors.text};
    font-family: ${fonts.primary};
    font-weight: 700;
    margin: 0;
`;

export const H3 = styled.h3`
    font-size: 18px;
    color: ${colors.text};
    font-family: ${fonts.primary};
    font-weight: 700;
    margin: 0 0 20px 0;
`;

export const H3Centered = styled.h3`
    font-size: 18px;
    text-align: center;
    color: ${colors.text};
    font-family: ${fonts.primary};
    font-weight: 700;
    margin: 0;
`;

export const H4 = styled.h4`
    font-size: 14px;
    color: ${colors.text};
    font-family: ${fonts.primary};
    font-weight: 700;
    margin: 0 0 20px 0;
`;

export const H4Centered = styled.h4`
    font-size: 14px;
    text-align: center;
    color: ${colors.text};
    font-family: ${fonts.primary};
    font-weight: 700;
    margin: 0;
`;

export const H5 = styled.h5`
    font-size: 13px;
    color: ${colors.text};
    font-family: ${fonts.primary};
    font-weight: 400;
    margin: 0;
`;

export const H6 = styled.h6`
    font-size: 12px;
    color: ${colors.text};
    font-family: ${fonts.primary};
    font-weight: 400;
    opacity: 0.6;
    margin: 0;
`;

export const H6Centered = styled.h6`
    font-size: 12px;
    text-align: center;
    color: ${colors.text};
    font-family: ${fonts.primary};
    font-weight: 400;
    opacity: 0.6;
    margin: 0;
`;

export const Label = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${colors.text};
    opacity: 0.6;
    text-transform: uppercase;
    font-family: ${fonts.primary};
`;

export const MutedText = styled.span`
    font-size: 11px;
    font-weight: 400;
    color: ${colors.text};
    opacity: 0.6;
    font-family: ${fonts.primary};
`;

// Header/Navigation
export const HeaderContainer = styled.header`
    max-width: 480px;
    margin: 0 auto;
    padding: 16px;
    border-bottom: 2px solid ${colors.border};
    margin-bottom: 20px;
    font-family: ${fonts.primary};
    color: ${colors.text};
    background-color: ${colors.bg};
`;

export const HeaderLogo = styled.div`
    text-align: center;
    margin-bottom: 4px;
`;

export const HeaderNav = styled.nav`
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-top: 12px;
    font-size: 12px;
    font-family: ${fonts.primary};
`;

export const NavLink = styled(Link)`
    color: ${colors.text};
    text-decoration: none;
    font-family: ${fonts.primary};
    font-size: 12px;
    font-weight: ${props => props.$active ? 700 : 400};
    opacity: ${props => props.$active ? 1 : 0.5};
    padding: 0;

    &:hover {
        opacity: 1;
    }
`;

export const SignOutButton = styled.button`
    background: none;
    border: none;
    color: ${colors.text};
    cursor: pointer;
    font-size: 12px;
    font-family: ${fonts.primary};
    font-weight: 400;
    padding: 0;
    opacity: 0.5;
    text-transform: uppercase;

    &:hover {
        opacity: 1;
    }
`;

// Buttons
export const Button = styled.button`
    background-color: ${colors.bg};
    border: 1px solid ${colors.border};
    margin: 16px 0 0 0;
    color: ${colors.text};
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline;
    font-size: 12px;
    cursor: pointer;
    font-family: ${fonts.primary};
    font-weight: 700;

    &:hover {
        background-color: ${colors.text};
        color: ${colors.bg};
    }
`;

export const LinkStyle = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: ${colors.text};
    font-family: ${fonts.primary};
    font-size: 12px;
    padding: 0;
    text-decoration: underline;

    &:hover {
        opacity: 0.6;
    }
`;

// Background
export const BackgroundStyles = styled.div`
    background-color: ${colors.bg};
    min-height: 100vh;
    padding: 0;
    font-family: ${fonts.primary};
    color: ${colors.text};
`;

// General Utilities
export const SignUpLink = styled(Link)`
    color: ${colors.text};
    text-decoration: underline;
    font-family: ${fonts.primary};

    &:hover {
        opacity: 0.6;
    }
`;

export const Center = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    max-width: 400px;
    color: ${colors.text};
    padding: 16px;
    margin: auto;
    font-family: ${fonts.primary};
`;

export const GlobalContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: fit-content;
    width: 100%;
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
    background-color: ${colors.bg};
    border: 1px solid ${colors.border};
    padding: 24px;
    max-width: 300px;
    text-align: center;
    font-family: ${fonts.primary};
`;

export const ConfirmDialogMessage = styled.p`
    font-family: ${fonts.primary};
    font-size: 13px;
    color: ${colors.text};
    margin: 0 0 20px 0;
    line-height: 1.6;
`;

export const ConfirmDialogButtons = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
`;

export const ConfirmDialogButton = styled.button`
    background-color: ${props => props.danger ? colors.text : colors.bg};
    border: 1px solid ${colors.border};
    color: ${props => props.danger ? colors.bg : colors.text};
    padding: 8px 16px;
    font-family: ${fonts.primary};
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    opacity: ${props => props.disabled ? 0.5 : 1};
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};

    &:hover {
        background-color: ${props => props.danger ? colors.bg : colors.text};
        color: ${props => props.danger ? colors.text : colors.bg};
    }
`;

// KebabMenu Components
export const KebabMenuButton = styled.button`
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: ${colors.text};
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${fonts.primary};

    &:hover {
        opacity: 0.6;
    }
`;

export const KebabMenuContainer = styled.div`
    position: relative;
`;

export const KebabMenuDropdown = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background-color: ${colors.bg};
    border: 1px solid ${colors.border};
    min-width: 120px;
    z-index: 100;
    margin-top: 4px;
`;

export const KebabMenuItem = styled.button`
    width: 100%;
    background: none;
    border: none;
    border-bottom: 1px dotted ${colors.border};
    padding: 10px 14px;
    text-align: left;
    font-family: ${fonts.primary};
    font-size: 12px;
    color: ${colors.text};
    cursor: pointer;
    text-transform: uppercase;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: ${colors.text};
        color: ${colors.bg};
    }
`;

// Circular Button
export const CircularButton = styled.button`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${colors.bg};
    border: 1px solid ${colors.border};
    color: ${colors.text};
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${fonts.primary};

    &:hover {
        background-color: ${colors.text};
        color: ${colors.bg};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

// ActionBar Container
export const ActionBarContainer = styled.div`
    position: fixed;
    bottom: 70px;
    left: 20px;
    display: flex;
    gap: 10px;
    z-index: 100;
    font-family: ${fonts.primary};
`;

// Centered Page Wrapper
export const CenteredPageWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 90px 16px 0px 16px;
    background-color: ${colors.bg};
    font-family: ${fonts.primary};
`;

// Footer Nav
export const FooterNavContainer = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${colors.bg};
    border-top: 2px solid ${colors.border};
    padding: 16px 20px;
    z-index: 100;
    font-family: ${fonts.primary};
`;

export const FooterNavLinks = styled.div`
    display: flex;
    justify-content: center;
    gap: 48px;
    font-size: 12px;
`;

export const FooterNavLink = styled.button`
    background: none;
    border: none;
    font-family: ${fonts.primary};
    font-size: 12px;
    font-weight: ${props => props.$active ? 700 : 400};
    opacity: ${props => props.$active ? 1 : 0.5};
    color: ${colors.text};
    cursor: pointer;
    padding: 0;

    &:hover {
        opacity: 1;
    }
`;

// Search Results

export const SearchResult = styled.div`
    padding: 10px 0;
    border-bottom: 1px dotted ${colors.border};
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        opacity: 0.7;
    }
`;



