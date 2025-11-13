import React, { useState } from 'react';
import { auth } from './../firebase.js';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { DineTogetherPosts, Input, H2, Button, SignUpLink } from '../styles/formStyles.js';

function SignIn(){  
  const navigate = useNavigate();
  const [signInSuccess, setSignInSuccess] = useState(null);

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully signed in as ${userCredential.user.displayName}!`)
        setTimeout(() => navigate('/'), 1000);
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}!`)
      });
    }

    return (
      <React.Fragment>
        <DineTogetherPosts>
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
          <p>Don't have an account? <SignUpLink to ="/sign-up">Sign up</SignUpLink></p>
        </DineTogetherPosts>
      </React.Fragment>
    );
  }

  export default SignIn
