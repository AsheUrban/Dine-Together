import React from 'react';
import PropTypes from 'prop-types';
import { FormContainer, Input, TextArea, Button } from '../styles';

function ReusableForm(props) {
  return (
    <React.Fragment>
        <FormContainer>
        <form onSubmit={props.formSubmissionHandler}>
          <Input
            type='hidden'
            name='placeId'
            value='' />

          <Input
            type='text'
            name='restaurantName'
            placeholder='Restaurant Name' />
          {props.errors?.restaurantName && <p style={{color: 'red', fontSize: '12px'}}>{props.errors.restaurantName}</p>}
          <br />
          <TextArea
            name='notes'
            placeholder='Personal notes.'
            maxLength='200' />
          {props.errors?.notes && <p style={{color: 'red', fontSize: '12px'}}>{props.errors.notes}</p>}
          <br />
          <Button type='submit'>{props.buttonText}</Button>
        </form>
        </FormContainer>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
  errors: PropTypes.object
};

export default ReusableForm;
