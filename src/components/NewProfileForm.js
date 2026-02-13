import PropTypes from 'prop-types';
import ReusableProfileForm from './ReusableProfileForm';

function NewProfileForm(props) {
    const { onSave, isLoading } = props;

    return (
        <ReusableProfileForm
            userBio={{}}
            onSave={onSave}
            onBack={null}
            isLoading={isLoading}
            buttonText="Create Profile"
        />
    );
}

NewProfileForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

export default NewProfileForm;
