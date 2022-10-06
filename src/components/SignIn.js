import React, { useState } from 'react';
import { auth } from './../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import styled from 'styled-components';

const DineTogetherPosts = styled.div`
background-color: #E7DDEE;
width: 300px;
margin: auto;
margin-top: 50px;
padding: 45px;
border: 2px solid #fffbc8;
text-align: center;
border-radius: 10px;
`;

const Input = styled.input`
border-radius: 5px;
border: 1px solid black;
margin: auto;
margin-bottom: 10px;
`;

const TextArea = styled.textarea`
border-radius: 5px;
border: 1px solid black;
margin: auto;
`;

const H2 = styled.h2`
font-size: 22px;
color: #700629;
`;

const Button = styled.button`
background-color: #700629;
border: 2px solid #FFFBC8;
margin: 10px;
color: #FFFBC8;
padding: 15px 32px;
text-align: center;
text-decoration: none;
display: inline;
font-size: 16px;
border-radius: 10px;
cursor: pointer;
`;

function SignIn(){  
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`)
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error signing up: ${error.message}!`)
      });
  }

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`)
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}!`)
      }); 
  }

  function doSignOut() {
    signOut(auth)
      .then(function() {
        setSignOutSuccess('You have successfully signed out');
      }).catch(function(error) {
        setSignOutSuccess('There was an Error signing out: ${error.message}!')
      });
  }
  
  return (
    <React.Fragment>
      <DineTogetherPosts>
        <H2>Sign up</H2>
        {signUpSuccess}
        <form onSubmit={doSignUp}>
          <Input
            type='text'
            name='email'
            placeholder='email' />
            <br />
          <Input
            type='password'
            name='password'
            placeholder='Password' />
            <br />
          <Button type='submit'>Sign up</Button>
        </form>
        <H2>Sign In</H2>
        {signInSuccess}
        <form onSubmit={doSignIn}>
          <Input
            type='text'
            name='signinEmail'
            placeholder='email' />
            <br />
          <Input
            type='password'
            name='signinPassword'
            placeholder='Password' />
            <br />
          <Button type='submit'>Sign in</Button>
        </form>
        {signOutSuccess}
        <br />
        <Button onClick={doSignOut}>Sign out</Button>
      </DineTogetherPosts>
    </React.Fragment>
  );
}

export default SignIn
