import React, { useState } from 'react';
import { auth } from './../firebase.js';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { CenteredPageWrapper, FormContainer, Input, Button, FormDivider, SignUpLink, H4, MutedText, FormMessage } from '../styles';
import { validateSignIn } from '../utils/validators';

function SignIn(){
    const navigate = useNavigate();
    const [signInSuccess, setSignInSuccess] = useState(null);
    const [errors, setErrors] = useState({});

    function doSignIn(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        const validationErrors = validateSignIn(email, password);

        if(validationErrors) {
        setErrors(validationErrors);
            return;
        }

        setErrors({});

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
            <CenteredPageWrapper>
                <FormContainer>
                    <H4>Sign In</H4>
                    {signInSuccess && <FormMessage>{signInSuccess}</FormMessage>}
                    <form onSubmit={doSignIn}>
                        <Input
                        id='email'
                        type='text'
                        name='email'
                        placeholder='email' />
                        <MutedText>{errors.email}</MutedText>
                        <Input
                        id='password'
                        type='password'
                        name='password'
                        placeholder='Password' />
                        <MutedText>{errors.password}</MutedText>
                        <Button type='submit'>Sign in</Button>
                    </form>
                    <FormDivider>— OR —</FormDivider>
                    <p>Don't have an account? <SignUpLink to ="/sign-up">Sign up</SignUpLink></p>
                </FormContainer>
            </CenteredPageWrapper>
        );
  }

  export default SignIn
