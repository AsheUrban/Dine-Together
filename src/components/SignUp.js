import React, { useState } from 'react';
import { auth } from './../firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { CenteredPageWrapper, FormContainer, FormLabel, Input, Button, FormDivider, SignUpLink, H4 } from '../styles';
import { validateSignUp } from '../utils/validators';
import { createUserProfile } from '../services/firebaseService.js';

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

        await createUserProfile(userCredential.user.uid, {
            username: username,
            email: email,
        });

        setSignUpSuccess(`You've successfully signed up, ${username}!`)
            setTimeout(() => navigate('/'), 1000);
        })
        .catch((error) => {
            setSignUpSuccess(`There was an error signing up: ${error.message}!`)
        });
    }

    return (
        <CenteredPageWrapper>
            <FormContainer>
                <H4>Sign up</H4>
                {signUpSuccess}
                <form onSubmit={doSignUp}>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Input
                    id='username'
                    type='text'
                    name='username'
                    placeholder='Username'
                    required />
                    {errors.username && <p style={{color: 'red', fontSize: '12px'}}>{errors.username}</p>}
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input
                    id='email'
                    type='text'
                    name='email'
                    placeholder='email'
                    required />
                    {errors.email && <p style={{color: 'red', fontSize: '12px'}}>{errors.email}</p>}
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input
                    id='password'
                    type='password'
                    name='password'
                    placeholder='Password' />
                    {errors.password && <p style={{color: 'red', fontSize: '12px'}}>{errors.password}</p>}
                    <FormLabel htmlFor='passwordConfirm'>Confirm Password</FormLabel>
                    <Input
                    id='passwordConfirm'
                    type='password'
                    name='passwordConfirm'
                    placeholder='Confirm Password' />
                    {errors.passwordConfirm && <p style={{color: 'red', fontSize: '12px'}}>{errors.passwordConfirm}</p>}
                    <Button type='submit'>Sign up</Button>
                </form>
                <FormDivider>— OR —</FormDivider>
                <p>Already have an account? <SignUpLink to ="/sign-in">Sign in</SignUpLink></p>
            </FormContainer>
        </CenteredPageWrapper>
    );
}

export default SignUp;
