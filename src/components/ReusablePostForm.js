import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    FormContainer,
    TextArea,
    Button,
    FormLabel,
    FormButtons,
    MutedText,
} from '../styles';

function ReusablePostForm(props) {
    const [errors, setErrors] = useState({});

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const caption = event.target.caption.value;

        setErrors({});
        const postData = {
            caption,
        };
        props.onSubmit(postData);
    };

    return (
        <FormContainer>
            <form id="postForm" onSubmit={handleFormSubmit}>
                <FormLabel htmlFor="caption">caption (optional):</FormLabel>
                <TextArea
                    id="caption"
                    name="caption"
                    defaultValue={props.caption || ''}
                    maxLength="300"
                />
                <MutedText>{errors.caption}</MutedText>
                <br />
            </form>
            <FormButtons>
                {props.backButton}
                <Button type="submit" form="postForm">
                    {props.buttonText}
                </Button>
            </FormButtons>
        </FormContainer>
    );
}

ReusablePostForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    backButton: PropTypes.node,
    caption: PropTypes.string,
};

export default ReusablePostForm;
