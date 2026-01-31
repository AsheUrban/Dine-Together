import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getPhotoUrl } from '../services/googlePlacesService';
import { toTitleCase, toSentenceCase, shortenAddress, formatPriceLevel } from '../utils/textFormatters';
import {
    PlaceWrapper,
    PlaceItem,
    PlaceImage,
    PlaceInfoSection,
    PlaceName,
    PlaceMeta,
    PlaceMetaDivider,
    PlaceAddress,
    PlacePrice,
    PlaceRating,
    PlaceRatingStar,
    PlaceRatingCount
} from '../styles';

function Place(props){
    const [imageError, setImageError] = useState(false);
    const photoUrl = props.photoReferences?.[0] ? getPhotoUrl(props.photoReferences[0]) : null;

    return (
        <PlaceWrapper>
            <PlaceItem variant={props.variant} onClick = {() => props.whenPlaceClicked(props.id)}>
                {photoUrl && !imageError ? (
                    <img
                        src={photoUrl}
                        alt={props.restaurantName}
                        style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <PlaceImage />
                )}
                <PlaceInfoSection>
                    <PlaceName>{toTitleCase(props.restaurantName)}</PlaceName>
                    <PlaceMeta>
                        <PlaceAddress>{shortenAddress(toSentenceCase(props.restaurantAddress))}</PlaceAddress>
                        {formatPriceLevel(props.priceLevel) && (
                            <>
                                <PlaceMetaDivider>·</PlaceMetaDivider>
                                <PlacePrice>{formatPriceLevel(props.priceLevel)}</PlacePrice>
                            </>
                        )}
                        <PlaceMetaDivider>·</PlaceMetaDivider>
                        <PlaceRating>
                            {props.rating ? (
                                <>
                                    <PlaceRatingStar>★</PlaceRatingStar> {props.rating}
                                    <PlaceRatingCount> ({props.userRatingsTotal?.toLocaleString()})</PlaceRatingCount>
                                </>
                            ) : 'Rating TBD'}
                        </PlaceRating>
                    </PlaceMeta>
                </PlaceInfoSection>
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
    photoReferences: PropTypes.array,
    id: PropTypes.string,
    whenPlaceClicked: PropTypes.func,
    variant: PropTypes.oneOf(['grid', 'post'])
}

export default Place;
