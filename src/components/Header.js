import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import { HeaderContainer, HeaderLogo, H1, HeaderNav, NavLink, HeaderProfile, SignOutButton } from '../styles';
import Avatar from './Avatar';

function Header({ user }) {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/sign-in');
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <React.Fragment>
            <HeaderContainer>
                <HeaderLogo>
                    <H1>DINE TOGETHER</H1>
                </HeaderLogo>

                <HeaderNav>
                    <NavLink to="/"> Feed </NavLink>
                    <NavLink to="/search">Search Restaurants</NavLink>
                </HeaderNav>

                <HeaderProfile>
                  {user ? (
                        <>
                            <NavLink to={`/profile/${user.uid}`}>
                                <Avatar displayName={user.displayName} variant="header" />
                                </NavLink>
                            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
                        </>
                    ) : (
                        <NavLink to="/sign-in"> Sign In </NavLink>
                    )}
               </HeaderProfile>
            </HeaderContainer>
        </React.Fragment>
    );
}

export default Header;
