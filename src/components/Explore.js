import React, { useState } from 'react';
import { DineTogetherPosts, H2, Input } from '../styles';

function Explore() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    return (
        <React.Fragment>
            <DineTogetherPosts>
                <H2>Search restaurants</H2>
                <Input
                    type='text'
                    placeholder='Restaurant name or location...'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <p>Coming Soon - Google Places API Integration!</p>
            </DineTogetherPosts>
        </React.Fragment>
    );
}

export default Explore;