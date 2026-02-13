import PropTypes from 'prop-types';
import { toTitleCase } from '../utils/textFormatters';
import { PlaceContainer, H4Centered, H6Centered } from '../styles';

function PlaceDetail({ place }) {
    return (
        <PlaceContainer>
            <H4Centered>{toTitleCase(place.restaurantName)}</H4Centered>
            <H6Centered>{place.restaurantAddress}</H6Centered>
        </PlaceContainer>
    );
}

PlaceDetail.propTypes = {
    place: PropTypes.object.isRequired,
};

export default PlaceDetail;
