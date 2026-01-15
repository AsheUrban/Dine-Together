import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InlineFormWrapper, TextArea, Button, BioLabel, CharacterCounter, FormButtons } from '../styles';

const BEST_MEAL_LIMIT = 75;
const GO_TO_MEALS_LIMIT = 75;
const ABOUT_ME_LIMIT = 150;

function ReusableProfileForm(props) {
    const { userBio, onSave, isLoading, buttonText, backButton } = props;
    const [bestMeal, setBestMeal] = useState(userBio?.bestMeal || '');
    const [goToMeals, setGoToMeals] = useState(userBio?.goToMeals || '');
    const [aboutMe, setAboutMe] = useState(userBio?.aboutMe || '');

    const handleSubmit = async(event) => {
        event.preventDefault();
        await onSave({
            bestMeal,
            goToMeals,
            aboutMe
        });
    };

    return (
        <InlineFormWrapper>
            <form id="profileForm" onSubmit={handleSubmit}>
                <BioLabel htmlFor="bestMeal">Best meal of your life: </BioLabel>
                <TextArea
                    id="bestMeal"
                    value={bestMeal}
                    onChange={(e) => setBestMeal(e.target.value)}
                    placeholder="Share a tasty morsel!"
                    maxLength={BEST_MEAL_LIMIT}
                />
                <CharacterCounter>{bestMeal.length}/{BEST_MEAL_LIMIT}</CharacterCounter>

                <BioLabel htmlFor="goToMeals">Go-To Restaurants:</BioLabel>
                <TextArea
                    id="goToMeals"
                    value={goToMeals}
                    onChange={(e) => setGoToMeals(e.target.value)}
                    placeholder="Who's kitchen never disappoints?"
                    maxLength={GO_TO_MEALS_LIMIT}
                 />
                 <CharacterCounter>{goToMeals.length}/{GO_TO_MEALS_LIMIT}</CharacterCounter>

                <BioLabel htmlFor="aboutMe">About you:</BioLabel>
                <TextArea
                    id="aboutMe"
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                    placeholder="Give us the juicy details!"
                    maxLength={ABOUT_ME_LIMIT}
                />
                <CharacterCounter>{aboutMe.length}/{ABOUT_ME_LIMIT}</CharacterCounter>
                </form>
                <FormButtons>
                    {backButton}
                    <Button type="submit" form="profileForm" disabled={isLoading}>{isLoading ? 'Saving...' : buttonText}</Button>
            </FormButtons>
        </InlineFormWrapper>
    );
}

ReusableProfileForm.propTypes = {
    userBio: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onBack: PropTypes.func,
    isLoading: PropTypes.bool,
    buttonText: PropTypes.string.isRequired
};

export default ReusableProfileForm;