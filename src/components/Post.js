import React from 'react';
import PropTypes from 'prop-types';
import Place from './Place';
import Avatar from './Avatar';
import { PostCard, PostHeader, Username, PostCaption } from '../styles';

function Post({ postId, authorId, username, caption, place, onPostClick }) {
    const handleClick = () => {
        onPostClick(postId, place, authorId);
    };

    return (
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
                timeOpen={place.timeOpen}
                id={place.id}
                whenPlaceClicked={handleClick}
            />
        </PostCard>
    );
    
}

Post.propTypes = {
    postId: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    caption: PropTypes.string,
    place: PropTypes.object.isRequired,
    onPostClick: PropTypes.func.isRequired
};

export default Post;
