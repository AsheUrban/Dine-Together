import React, { useState } from 'react';
import { FormContainer, H3, Input, } from '../styles';
import { useExploreSearch } from '../hooks/exploreSearch';


function Explore() {
    const [searchQuery, setSearchQuery] = useState('');
    const { places, loading, error } = useExploreSearch(searchQuery);
   

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handlePlaceSelect = (prediction) => {
        console.log('Selected place:', prediction);
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
                {loading && <p>Searching...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {places.length > 0 && (
                    <div style={{ textAlign: 'left', marginTop: '10px' }}>
                        {places.map((place) => (
                            <div
                                key={place.googlePlaceId}
                                onClick={() => handlePlaceSelect(place)}
                                style={{
                                    padding: '10px',
                                    borderBottom: '1px solid #D4A574',
                                    cursor: 'pointer'
                                }}
                            >
                                <strong>{place.name}</strong>
                                <br/>
                                <span style={{ fontSize: '12px', color: '#666' }}>
                                    {place.address}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </FormContainer>
        </React.Fragment>
    );
}

export default Explore;
