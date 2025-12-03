import React from 'react';
import PropTypes from 'prop-types';
import Place from './Place';
import Avatar from './Avatar';
import { formatDistanceToNow } from 'date-fns';
import { PostCard, PostHeader, Username, PostCaption, PostWrapper, PlacedDate, LinkStyle } from '../styles';
import { usePlaceSaveState } from '../hooks/placeSaveState';

function Post({ postId, authorId, username, caption, place, timeOpen, onPostClick }) {
    const { savedByUsers, savedByUsernames, showAllSavedBy, setShowAllSavedBy } = usePlaceSaveState(place.id);
    const handleClick = () => {
        onPostClick(postId, place, authorId);
    };

    const renderSavedByInfo = () => {
                if (savedByUsers.length === 0) return null;
        
                if (savedByUsers.length <= 3) {
                    return (
                        <p> 
                           Saved by: {savedByUsers.map(userId => savedByUsernames[userId]).join(', ')} 
                        </p>
                    );
                }
        
                return (
                    <p>
                        Saved by: {showAllSavedBy ?
                            savedByUsers.map(userId => savedByUsernames[userId]).join(', ')
                            : `${savedByUsers.length} people`
                        }
                        {!showAllSavedBy && <LinkStyle onClick={() => setShowAllSavedBy(true)}>more</LinkStyle>}
                    </p>
                );
            };

    return (
        <PostWrapper>
            <PostCard onClick={handleClick}>
                <PostHeader>
                    <Avatar displayName={username} variant="profile"/>
                    <Username>{username}</Username>
                </PostHeader>
                <PostCaption>{caption}</PostCaption>
                <Place
                    restaurantName={place.restaurantName}
                    restaurantAddress={place.restaurantAddress}
                    priceLevel={place.priceLevel}
                    rating={place.rating}
                    userRatingsTotal={place.userRatingsTotal}
                    id={place.id}
                    whenPlaceClicked={handleClick}
                />
                {renderSavedByInfo()}
            </PostCard>
            <PlacedDate>{formatDistanceToNow(timeOpen, { addSuffix: true })}</PlacedDate>
        </PostWrapper>
    );
    
}

Post.propTypes = {
    postId: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    caption: PropTypes.string,
    timeOpen: PropTypes.object,
    place: PropTypes.object.isRequired,
    onPostClick: PropTypes.func.isRequired
};

export default Post;
