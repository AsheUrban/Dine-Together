import React, { useState } from 'react';
import { auth } from './../firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { FormContainer, Input, H2, Button, SignUpLink } from '../styles';
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
        <React.Fragment>
            <FormContainer>
                <H2>Sign up</H2>
                {signUpSuccess}
                <form onSubmit={doSignUp}>
                    <label htmlFor='username'>Username</label>
                    <Input
                    id='username'
                    type='text'
                    name='username'
                    placeholder='Username'
                    required />
                    {errors.username && <p style={{color: 'red', fontSize: '12px'}}>{errors.username}</p>}
                    <br />
                    <label htmlFor='email'>Email</label>
                    <Input
                    id='email'
                    type='text'
                    name='email'
                    placeholder='email'
                    required />
                    {errors.email && <p style={{color: 'red', fontSize: '12px'}}>{errors.email}</p>}
                    <br />
                    <label htmlFor='password'>Password</label>
                    <Input
                    id='password'
                    type='password'
                    name='password'
                    placeholder='Password' />
                    {errors.password && <p style={{color: 'red', fontSize: '12px'}}>{errors.password}</p>}
                    <br />
                    <label htmlFor='passwordConfirm'>Confirm Password</label>
                    <Input
                    id='passwordConfirm'
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
