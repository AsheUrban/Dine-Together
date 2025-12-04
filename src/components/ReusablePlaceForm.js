import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormContainer, Input, TextArea, Button, PostLabel } from '../styles';
import { validatePlace } from '../utils/validators';

function ReusablePlaceForm(props) {
    const [errors, setErrors] = useState({});

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const placeId = event.target.placeId.value;
        const restaurantName = event.target.restaurantName.value;
        const notes = event.target.notes.value;

        const validationErrors = validatePlace(placeId, restaurantName, notes);

        if(validationErrors) {
          setErrors(validationErrors);
          return;
        }

        setErrors({});
        const placeData = {
          placeId,
          restaurantName,
          notes
        };
        props.onSubmit(placeData);

    };

    return (
        <React.Fragment>
            <FormContainer>
            <form onSubmit={handleFormSubmit}>
              <Input
                type='hidden'
                name='placeId'
                defaultValue={props.placeId || ''} />
              <PostLabel htmlFor='restaurantName'>Restaurant Name:</PostLabel>
              <Input
                id='restaurantName'
                type='text'
                name='restaurantName'
                defaultValue={props.restaurantName || ''} />
              {errors?.restaurantName && <p style={{color: 'red', fontSize: '12px'}}>{errors.restaurantName}</p>}
              <br />
              <PostLabel htmlFor='notes'>Notes:</PostLabel>
              <TextArea
                id='notes'
                name='notes'
                defaultValue={props.notes || ''}
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

  ReusablePlaceForm.propTypes = {
      onSubmit: PropTypes.func.isRequired,
      buttonText: PropTypes.string.isRequired,
      cancelButton: PropTypes.node,
      deleteButton: PropTypes.node,
      restaurantName: PropTypes.string,
      placeId: PropTypes.string,
      notes: PropTypes.string
  };

  export default ReusablePlaceForm;
