import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import styled from 'styled-components';

const DineTogetherHeader = styled.div`
  text-align: center;
  width: 100vw;
  color: #FFFBC8;
  padding: 25px;
  margin: auto;
  background-color: #B16825;
  box-sizing: border-box;
`;

const H1 = styled.h1`
  font-size: 59px;
  margin: 0;
`
const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0;
`;

const NavLink = styled(Link)`
  color: #FFFBC8;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SignOutButton = styled.button`
  background: none;
  border: none;
  color: #FFFBC8;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;  

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
          <H1>
          DINE TOGETHER
          </H1>
          <Center>
            <NavLink to="/"> Home </NavLink> &emsp;|&emsp;
            {user ? (
              <>
              <NavLink to={`/profile/${user.uid}`}>{user.displayName}</NavLink>&emsp;|&emsp;
              <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
              </>
            ) : (
              <NavLink to="/sign-in"> Sign In </NavLink>
            )}
            </Center>
            </DineTogetherHeader>
       
    </React.Fragment>
  );
}

export default Header;