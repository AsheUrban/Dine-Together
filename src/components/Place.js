import React from 'react';
import PropTypes from 'prop-types';
import { H6Centered, PlaceWrapper, PlaceItem, PlaceContent, PlaceImage, PlaceDetails, H4Centered } from '../styles';

const shortenAddress = (address) => {
    if (!address) return '';

    const parts = address.split(',').map(p => p.trim());
    if (parts.length <= 2) return address;
    const shortened = parts.slice(0, -1).join(', ');
    return shortened.replace(/\s\d{5}(-\d{4})?$/, '');
};

function Place(props){
    return (
        <PlaceWrapper>
            <PlaceItem onClick = {() => props.whenPlaceClicked(props.id)}>
                <H4Centered>{props.restaurantName}</H4Centered>
                <H6Centered>{shortenAddress(props.restaurantAddress)}</H6Centered>
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
