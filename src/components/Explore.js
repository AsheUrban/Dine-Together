import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, H3, Input, SearchResult, MutedText } from '../styles';
import { useExploreSearch } from '../hooks/exploreSearch';
import { usePlaceSelect } from '../hooks/placeSelect';


function Explore() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { places, loading, error } = useExploreSearch(searchQuery);
    const { selectPlace, loading: selectLoading, error: selectError } = usePlaceSelect();
   

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handlePlaceSelect = async (prediction) => {
        const place = await selectPlace(prediction.googlePlaceId);
        navigate(`/place/${place.id}`);
    };

     return (
        <React.Fragment>
            <FormContainer>
                <H3>Search restaurants</H3>
                <Input
                    type='text'
                    placeholder='Restaurant name or location...'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                {(loading || selectLoading) && <p>Searching...</p>}
                {(error || selectError) && <MutedText>{error || selectError}</MutedText>}
                {places.length > 0 && (
                    <div>
                        {places.map((place) => (
                            <SearchResult
                                key={place.googlePlaceId}
                                onClick={() => handlePlaceSelect(place)}
                            >
                                <strong>{place.name}</strong>
                                <br/>
                                <MutedText>{place.address}</MutedText>
                            </SearchResult>
                        ))}
                    </div>
                )}
            </FormContainer>
        </React.Fragment>
    );
}

export default Explore;
