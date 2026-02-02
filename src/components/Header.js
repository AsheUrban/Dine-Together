import React from 'react';
import { useLocation } from 'react-router-dom';
import { HeaderContainer, HeaderLogo, H1, HeaderNav, NavLink, HeaderProfile } from '../styles';
import Avatar from './Avatar';

function Header({ user }) {
    const location = useLocation();
    const path = location.pathname;

    const isFeed = path === '/';
    const isExplore = path === '/search';
    const isProfile = path.startsWith('/profile');

    return (
        <React.Fragment>
            <HeaderContainer>
                <HeaderLogo>
                    <H1>DINE TOGETHER</H1>
                </HeaderLogo>

                <HeaderNav>
                    <NavLink to="/" $active={isFeed}>{isFeed ? '[FEED]' : 'FEED'}</NavLink>
                    <NavLink to="/search" $active={isExplore}>{isExplore ? '[EXPLORE]' : 'EXPLORE'}</NavLink>
                    {user ? (
                        <NavLink to={`/profile/${user.uid}`} $active={isProfile}>{isProfile ? '[PROFILE]' : 'PROFILE'}</NavLink>
                    ) : (
                        <NavLink to="/sign-in">SIGN IN</NavLink>
                    )}
                </HeaderNav>

                <HeaderProfile>
                    {user && (
                        <NavLink to={`/profile/${user.uid}`}>
                            <Avatar displayName={user.displayName} size="36px" variant="header" />
                        </NavLink>
                    )}
                </HeaderProfile>
            </HeaderContainer>
        </React.Fragment>
    );
}

export default Header;
