import React from 'react';
import PropTypes from 'prop-types';
import { PlaceContainer, H3Centered, H6Centered } from '../styles';

function PlaceDetail({ place }) {
    return (
        <PlaceContainer>
            <H3Centered>{place.restaurantName}</H3Centered>
            <H6Centered>{place.restaurantAddress}</H6Centered>
        </PlaceContainer>
    );
}

PlaceDetail.propTypes = {
    place: PropTypes.object.isRequired
};

export default PlaceDetail;
