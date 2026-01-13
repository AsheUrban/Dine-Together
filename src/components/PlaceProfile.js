import React from 'react';
import PropTypes from 'prop-types';
import PlaceDetail from './PlaceDetail';
import ActionBar from './ActionBar';
import { CircularButton } from '../styles';

function PlaceProfile({ place, onBack, isSaved, isLoading, onAdd }) {
    return (
        <>
            <PlaceDetail place={place} />
            <ActionBar>
                <CircularButton onClick={onBack}>↩</CircularButton>
                {isSaved === false && (
                    <CircularButton onClick={onAdd} disabled={isLoading}>
                        +
                    </CircularButton>
                )}
            </ActionBar>
        </>
    );
}

PlaceProfile.propTypes = {
    place: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
    isSaved: PropTypes.bool,
    isLoading: PropTypes.bool,
    onAdd: PropTypes.func
};

export default PlaceProfile;