import React, { useState } from 'react';
import NewPostForm from './NewPostForm.js';
import { FormContainer, H2, Input, Button, Center } from '../styles';
import { addNewPost } from '../services/firebaseService.js';
import { auth } from '../firebase.js';

function Explore() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddForm, SetShowAddForm] = useState(false);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleAddingNewPost = async (newPostData) => {
        await addNewPost(newPostData);
        SetShowAddForm(false);
    }

    const handleToggleForm = () => {
        SetShowAddForm(!showAddForm);
    }

    if(showAddForm) {
        return (
            <>
                <NewPostForm
                    onNewPostCreation={handleAddingNewPost}
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
                <H2>Search restaurants</H2>
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
