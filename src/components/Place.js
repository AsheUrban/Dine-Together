import React from 'react';
import PropTypes from 'prop-types';
import { toTitleCase, toSentenceCase, shortenAddress, formatPriceLevel } from '../utils/textFormatters';
import { H6Centered, PlaceWrapper, PlaceItem, PlaceContent, PlaceImage, PlaceDetails, H4Centered } from '../styles';

function Place(props){
    return (
        <PlaceWrapper>
            <PlaceItem onClick = {() => props.whenPlaceClicked(props.id)}>
                <H4Centered>{toTitleCase(props.restaurantName)}</H4Centered>
                <H6Centered>{shortenAddress(toSentenceCase(props.restaurantAddress))}</H6Centered>
                <PlaceContent>
                    <PlaceImage />
                    <PlaceDetails>
                        <p>{formatPriceLevel(props.priceLevel)}</p>
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
    priceLevel: PropTypes.string,
    rating: PropTypes.number,
    userRatingsTotal: PropTypes.number,
    id: PropTypes.string,
    whenPlaceClicked: PropTypes.func
}

export default Place;
