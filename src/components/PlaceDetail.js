import React from 'react';
import PropTypes from 'prop-types';
import { PlaceContainer, H3Centered, H4 } from '../styles';

function PlaceDetail({ place }) {
    return (
        <PlaceContainer>
            <H3Centered>{place.restaurantName}</H3Centered>
            <H4>{place.restaurantAddress}</H4>
        </PlaceContainer>
    );
}

PlaceDetail.propTypes = {
    place: PropTypes.object.isRequired
};

export default PlaceDetail;
