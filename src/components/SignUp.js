import React, { useState } from 'react';
import { auth } from './../firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from './../firebase.js';
import { DineTogetherPosts, Input, H2, Button, SignUpLink } from '../styles/formStyles.js';

  function SignUp(){  
    const navigate = useNavigate();
    const [signUpSuccess, setSignUpSuccess] = useState(null);
  
    function doSignUp(event) {
      event.preventDefault();
      const username = event.target.username.value;
      const email = event.target.email.value;
      const password = event.target.password.value;
  
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          await updateProfile(userCredential.user, {
            displayName: username
        });
        
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          username: username,
          email: email,
          createdAt: new Date()
        });
  
          setSignUpSuccess(`You've successfully signed up, ${username}!`)
          setTimeout(() => navigate('/'), 1000);
        })
        .catch((error) => {
          setSignUpSuccess(`There was an error signing up: ${error.message}!`)
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
                  name='username'
                  placeholder='Username'
                  required />
                  <br />
                <Input
                  type='text'
                  name='email'
                  placeholder='email'
                  required />
                  <br />
                <Input
                  type='password'
                  name='password'
                  placeholder='Password' />
                  <br />
                <Button type='submit'>Sign up</Button>
              </form>
              <p>Already have an account? <SignUpLink to ="/sign-in">Sign in</SignUpLink></p>
            </DineTogetherPosts>
        </React.Fragment>
      );
    }

            export default SignUp;