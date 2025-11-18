import React, { useState } from 'react';
import { auth } from './../firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from './../firebase.js';
import { FormContainer, Input, H2, Button, SignUpLink } from '../styles';
import { validateSignUp } from '../utils/validators';

  function SignUp(){
    const navigate = useNavigate();
    const [signUpSuccess, setSignUpSuccess] = useState(null);
    const [errors, setErrors] = useState({});

    function doSignUp(event) {
      event.preventDefault();
      const username = event.target.username.value;
      const email = event.target.email.value;
      const password = event.target.password.value;
      const passwordConfirm = event.target.passwordConfirm.value;

      const validationErrors = validateSignUp(username, email, password, passwordConfirm);

      if(validationErrors) {
        setErrors(validationErrors);
        return;
      }

      setErrors({});

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
          <FormContainer>
            <H2>Sign up</H2>
              {signUpSuccess}
              <form onSubmit={doSignUp}>
                <Input
                  type='text'
                  name='username'
                  placeholder='Username'
                  required />
                {errors.username && <p style={{color: 'red', fontSize: '12px'}}>{errors.username}</p>}
                <br />
                <Input
                  type='text'
                  name='email'
                  placeholder='email'
                  required />
                {errors.email && <p style={{color: 'red', fontSize: '12px'}}>{errors.email}</p>}
                <br />
                <Input
                  type='password'
                  name='password'
                  placeholder='Password' />
                {errors.password && <p style={{color: 'red', fontSize: '12px'}}>{errors.password}</p>}
                <br />
                <Input
                  type='password'
                  name='passwordConfirm'
                  placeholder='Confirm Password' />
                {errors.passwordConfirm && <p style={{color: 'red', fontSize: '12px'}}>{errors.passwordConfirm}</p>}
                <br />
                <Button type='submit'>Sign up</Button>
              </form>
              <p>Already have an account? <SignUpLink to ="/sign-in">Sign in</SignUpLink></p>
            </FormContainer>
        </React.Fragment>
      );
    }

            export default SignUp;
