import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { H3Centered, H4, PlaceWrapper, PlaceItem, PlaceContent, PlaceImage, PlaceDetails, PlacedDate } from '../styles';

function Place(props){
    return (
        <PlaceWrapper>
            <PlaceItem onClick = {() => props.whenPlaceClicked(props.id)}>
                <H3Centered>{props.restaurantName}</H3Centered>
                <H4>{props.restaurantAddress}</H4>
                <PlaceContent>
                    <PlaceImage />
                    <PlaceDetails>
                        <p>{props.priceLevel ? '$'.repeat(props.priceLevel) : 'Price TBD'}</p>
                        <p>{props.rating ? `⭐ ${props.rating} (${props.userRatingsTotal})` : 'Rating TBD'}</p>
                    </PlaceDetails>
                </PlaceContent>
            </PlaceItem>
            <PlacedDate>{formatDistanceToNow(props.timeOpen, { addSuffix: true })}</PlacedDate>
        </PlaceWrapper>
    );
}

Place.propTypes = {
    restaurantName: PropTypes.string,
    restaurantAddress: PropTypes.string,
    priceLevel: PropTypes.number,
    rating: PropTypes.number,
    userRatingsTotal: PropTypes.number,
    timeOpen: PropTypes.object,
    id: PropTypes.string,
    whenPlaceClicked: PropTypes.func
}

export default Place;
