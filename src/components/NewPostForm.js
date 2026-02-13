import ReusablePostForm from './ReusablePostForm';
import PropTypes from 'prop-types';

function NewPostForm(props) {
    const handleSubmit = (postData) => {
        props.onNewPostCreation({
            ...postData,
            placeId: props.placeId,
            userId: props.userId,
        });
    };

    return (
        <ReusablePostForm onSubmit={handleSubmit} buttonText="Create Post" />
    );
}

NewPostForm.propTypes = {
    onNewPostCreation: PropTypes.func.isRequired,
    placeId: PropTypes.string.isRequired,
    userId: PropTypes.string,
};

export default NewPostForm;
