import PropTypes from 'prop-types';
import ReusableProfileForm from './ReusableProfileForm';
import { CircularButton } from '../styles';

function EditProfileForm(props) {
    const { userBio, onSave, onBack, isLoading } = props;

    return (
        <ReusableProfileForm
            userBio={userBio}
            onSave={onSave}
            backButton={<CircularButton onClick={onBack}>↩</CircularButton>}
            isLoading={isLoading}
            buttonText="Save"
        />
    );
}

EditProfileForm.propTypes = {
    userBio: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

export default EditProfileForm;
