import React from 'react';
import PropTypes from 'prop-types';
import { FormContainer, Input, TextArea, Button } from '../styles';

function ReusableForm(props) {
  return (
    <React.Fragment>
        <FormContainer>
        <form onSubmit={props.onSubmit}>
          <Input
            type='hidden'
            name='placeId'
            defaultValue={props.placeId || ''} />
          <Input
            type='text'
            name='restaurantName'
            defaultValue={props.restaurantName || ''}
            placeholder='Restaurant Name' />
          {props.errors?.restaurantName && <p style={{color: 'red', fontSize: '12px'}}>{props.errors.restaurantName}</p>}
          <br />
          <TextArea
            name='notes'
            defaultValue={props.notes || ''}
            placeholder='Personal notes.'
            maxLength='200' />
          {props.errors?.notes && <p style={{color: 'red', fontSize: '12px'}}>{props.errors.notes}</p>}
          <br />
          <Button type='submit'>{props.buttonText}</Button>
        </form>
        {props.cancelButton}
        {props.deleteButton}
        </FormContainer>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  onSubmit: PropTypes.func,
  buttonText: PropTypes.string,
  errors: PropTypes.object,
  cancelButton: PropTypes.node,
  deleteButton: PropTypes.node,
  restaurantName: PropTypes.string,
  placeId: PropTypes.string,
  notes: PropTypes.string
};

export default ReusableForm;
