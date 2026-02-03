import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormContainer, Input, TextArea, Button, FormButtons, MutedText } from '../styles';
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
            <form id="placeForm" onSubmit={handleFormSubmit}>
            <Input
                type='hidden'
                name='placeId'
                defaultValue={props.placeId || ''} />
            <Input
                id='restaurantName'
                type='text'
                name='restaurantName'
                defaultValue={props.restaurantName || ''} 
                placeholder='restaurant name' />
            <MutedText>{errors.restaurantName}</MutedText>
            <br />
            <TextArea
                id='notes'
                name='notes'
                defaultValue={props.notes || ''}
                maxLength='200' 
                placeholder='notes'/>
            <MutedText>{errors.notes}</MutedText>
            <br />
            </form>
            <FormButtons>
                {props.backButton}
                <Button type='submit' form="placeForm">{props.buttonText}</Button>
            </FormButtons>
        </FormContainer>
        </React.Fragment>
    );
}

ReusablePlaceForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    backButton: PropTypes.node,
    restaurantName: PropTypes.string,
    placeId: PropTypes.string,
    notes: PropTypes.string
};

export default ReusablePlaceForm;
