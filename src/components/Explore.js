import React, { useState } from 'react';
import NewPlaceForm from './NewPlaceForm.js';
import { FormContainer, H3, Input, Button, Center } from '../styles';
import { addNewPlace } from '../services/firebaseService.js';
import { auth } from '../firebase.js';

function Explore() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddForm, SetShowAddForm] = useState(false);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleAddingNewPlace = async (newPlaceData) => {
        await addNewPlace(newPlaceData);
        SetShowAddForm(false);
    }

    const handleToggleForm = () => {
        SetShowAddForm(!showAddForm);
    }

    if(showAddForm) {
        return (
            <>
                <NewPlaceForm
                    onNewPlaceCreation={handleAddingNewPlace}
                    userId={auth.currentUser.uid}
            />
            <center>
                <Button onClick={handleToggleForm}>Back to Search</Button>
            </center>
            </>
        );
    }
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
                <p>Coming Soon - Google Places API Integration!</p>
            </FormContainer>
            <Center>
                <Button onClick={handleToggleForm}>Add Restaurant</Button>
            </Center>
        </React.Fragment>
    );
}

export default Explore;
