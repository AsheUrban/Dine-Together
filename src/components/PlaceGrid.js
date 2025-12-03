import React from 'react';
import Place from './Place';
import PropTypes from 'prop-types';
import { H1, PlaceGridStyles } from '../styles';

function PlaceGrid(props) {
    const { placeList, onPlaceSelection } = props;

    return (
        <>
            {placeList.length > 0 ? (
                <PlaceGridStyles>
                    {placeList.map((place) => (
                        <Place
                            key={place.id}
                                restaurantName={place.restaurantName}
                                restaurantAddress={place.restaurantAddress}
                                priceLevel={place.priceLevel}
                                rating={place.rating}
                                userRatingsTotal={place.userRatingsTotal}
                                id={place.id}
                            whenPlaceClicked={onPlaceSelection}
                        />
                    ))}
                </PlaceGridStyles>
            ) : (
                <H1>No restaurants have been added yet. Explore restaurants to get started!</H1>
            )}
        </>
    );
}

PlaceGrid.propTypes = {
    placeList: PropTypes.array.isRequired,
    onPlaceSelection: PropTypes.func.isRequired
};

export default PlaceGrid;
