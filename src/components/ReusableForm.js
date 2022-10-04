import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DineTogetherPosts = styled.div`
background-color: #FFFFFF;
width: 300px;
margin: auto;
padding: 45px;
border: 2px solid #fffbc8;
text-align: center;
border-radius: 10px;
`;

const DineTogetherPost = styled.div`
background-color: #E7DDEE;
width: 1280px;
margin: auto;
border: 2px solid #FFFBC8;
padding-top: 150px;
padding-bottom: 150px;
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

const H3 = styled.h3`
font-size: 22px;
color: #FFFBC8;
`;

const Button = styled.button`
background-color: #f5b700; /* Cornflower Blue */
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
      <DineTogetherPost>
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
          <button type='submit'>{props.buttonText}</button>
        </form>
        </DineTogetherPosts>
      </DineTogetherPost>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;