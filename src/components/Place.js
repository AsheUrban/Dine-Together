import React from 'react';
import PropTypes from 'prop-types';
import { H6Centered, PlaceWrapper, PlaceItem, PlaceContent, PlaceImage, PlaceDetails, H3Centered } from '../styles';

function Place(props){
    return (
        <PlaceWrapper>
            <PlaceItem onClick = {() => props.whenPlaceClicked(props.id)}>
                <H3Centered>{props.restaurantName}</H3Centered>
                <H6Centered>{props.restaurantAddress}</H6Centered>
                <PlaceContent>
                    <PlaceImage />
                    <PlaceDetails>
                        <p>{props.priceLevel ? '$'.repeat(props.priceLevel) : 'Price TBD'}</p>
                        <p>{props.rating ? `⭐ ${props.rating} (${props.userRatingsTotal})` : 'Rating TBD'}</p>
                    </PlaceDetails>
                </PlaceContent>
            </PlaceItem>
        </PlaceWrapper>
    );
}

Place.propTypes = {
    restaurantName: PropTypes.string,
    restaurantAddress: PropTypes.string,
    priceLevel: PropTypes.number,
    rating: PropTypes.number,
    userRatingsTotal: PropTypes.number,
    id: PropTypes.string,
    whenPlaceClicked: PropTypes.func
}

export default Place;
