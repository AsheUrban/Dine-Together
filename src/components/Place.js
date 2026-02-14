import { useState } from 'react';
import PropTypes from 'prop-types';
import { getPhotoUrl } from '../services/googlePlacesService';
import {
    toTitleCase,
    toSentenceCase,
    splitAddress,
    formatPriceLevel,
} from '../utils/textFormatters';
import {
    PlaceWrapper,
    PlaceItem,
    PlaceImageContainer,
    PlacePhoto,
    PlaceImage,
    PlaceInfoSection,
    PlaceNameRow,
    PlaceName,
    RatingPill,
    PlaceAddress,
    PlacePrice,
} from '../styles';

function Place(props) {
    const [imageError, setImageError] = useState(false);
    const photoUrl = props.photoReferences?.[0]
        ? getPhotoUrl(props.photoReferences[0], 800)
        : null;
    const variant = props.variant || 'grid';
    const { street, cityState } = splitAddress(
        toSentenceCase(props.restaurantAddress),
    );

    return (
        <PlaceWrapper>
            <PlaceItem
                variant={variant}
                onClick={() => props.whenPlaceClicked(props.id)}
            >
                <PlaceImageContainer>
                    {photoUrl && !imageError ? (
                        <PlacePhoto
                            src={photoUrl}
                            alt={props.restaurantName}
                            variant={variant}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <PlaceImage variant={variant} />
                    )}
                </PlaceImageContainer>
                <PlaceInfoSection>
                    <PlaceName variant={variant}>
                        {toTitleCase(props.restaurantName)}
                    </PlaceName>
                    <PlaceAddress variant={variant}>{street}</PlaceAddress>
                    <PlaceAddress variant={variant}>{cityState}</PlaceAddress>
                    <PlaceNameRow>
                        <PlacePrice variant={variant}>
                            {formatPriceLevel(props.priceLevel) || '\u00A0'}
                        </PlacePrice>
                        {props.rating && (
                            <RatingPill variant={variant}>
                                ★ {props.rating}
                            </RatingPill>
                        )}
                    </PlaceNameRow>
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
    variant: PropTypes.oneOf(['grid', 'post']),
};

export default Place;
