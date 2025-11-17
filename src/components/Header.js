import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import { DineTogetherHeader, H1, HeaderNav, NavLink, SignOutButton } from '../styles';

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
            <DineTogetherHeader>
                <H1>DINE TOGETHER</H1>
                <HeaderNav>
                    <NavLink to="/"> Home </NavLink> &emsp;|&emsp;
                    {user ? (
                        <>
                            <NavLink to={`/profile/${user.uid}`}>{user.displayName}</NavLink>&emsp;|&emsp;
                            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
                        </>
                    ) : (
                        <NavLink to="/sign-in"> Sign In </NavLink>
                    )}
                </HeaderNav>
            </DineTogetherHeader>
        </React.Fragment>
    );
}

export default Header;
