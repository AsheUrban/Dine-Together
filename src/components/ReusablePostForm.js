import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormContainer, TextArea, Button, PostLabel, FormButtons } from '../styles';

function ReusablePostForm(props) {
    const [errors, setErrors] = useState({});

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const caption = event.target.caption.value;

        setErrors({});
        const postData = {
            caption
        };
        props.onSubmit(postData);
    };

    return (
        <React.Fragment>
            <FormContainer>
                <form id="postForm" onSubmit={handleFormSubmit}>
                    <PostLabel htmlFor='caption'>Caption (optional):</PostLabel>
                    <TextArea
                        id='caption'
                        name='caption'
                        defaultValue={props.caption || ''}
                        maxLength='300' />
                    {errors?.caption && <p style={{color: 'red', fontSize: '12px'}}>{errors.caption}</p>}
                    <br />
                </form>
                <FormButtons>
                    {props.backButton}
                    <Button type='submit' form="postForm">{props.buttonText}</Button>
                </FormButtons>
            </FormContainer>
        </React.Fragment>
    );
}

ReusablePostForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    backButton: PropTypes.node,
    caption: PropTypes.string
};

export default ReusablePostForm;
