import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormContainer, Input, TextArea, Button } from '../styles';
import { validatePost } from '../utils/validators';

function ReusablePostForm(props) {
    const [errors, setErrors] = useState({});

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const placeId = event.target.placeId.value;
        const restaurantName = event.target.restaurantName.value;
        const notes = event.target.notes.value;

        const validationErrors = validatePost(placeId, restaurantName, notes);

        if(validationErrors) {
          setErrors(validationErrors);
          return;
        }

        setErrors({});
        const postData = {
          placeId,
          restaurantName,
          notes
        };
        props.onSubmit(postData);

    };

    return (
        <React.Fragment>
            <FormContainer>
            <form onSubmit={handleFormSubmit}>
              <Input
                type='hidden'
                name='placeId'
                defaultValue={props.placeId || ''} />
              <Input
                type='text'
                name='restaurantName'
                defaultValue={props.restaurantName || ''}
                placeholder='Restaurant Name' />
              {errors?.restaurantName && <p style={{color: 'red', fontSize: '12px'}}>{errors.restaurantName}</p>}
              <br />
              <TextArea
                name='notes'
                defaultValue={props.notes || ''}
                placeholder='Personal notes.'
                maxLength='200' />
              {errors?.notes && <p style={{color: 'red', fontSize: '12px'}}>{errors.notes}</p>}
              <br />
              <Button type='submit'>{props.buttonText}</Button>
            </form>
            {props.cancelButton}
            {props.deleteButton}
            </FormContainer>
        </React.Fragment>
      );
  }

  ReusablePostForm.propTypes = {
      onSubmit: PropTypes.func.isRequired,
      buttonText: PropTypes.string.isRequired,
      cancelButton: PropTypes.node,
      deleteButton: PropTypes.node,
      restaurantName: PropTypes.string,
      placeId: PropTypes.string,
      notes: PropTypes.string
  };

  export default ReusablePostForm;
