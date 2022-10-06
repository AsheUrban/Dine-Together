import React from 'react';
import PropTypes from 'prop-types';
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

function ReusableForm(props) {
  return (
    <React.Fragment>
        <DineTogetherPosts>
        <form onSubmit={props.formSubmissionHandler}>
          <Input
            type='text'
            name='names'
            placeholder='Restaurant Name' />
            <br />
          <Input
            type='text'
            name='location'
            placeholder='Restaurant Location' />
            <br />
          <TextArea
            name='issue'
            placeholder='Date of reservation and brief description.' />
            <br />
          <Button type='submit'>{props.buttonText}</Button>
        </form>
        </DineTogetherPosts>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;