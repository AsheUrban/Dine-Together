import React from 'react';
import PropTypes from 'prop-types';
import Place from './Place';
import Avatar from './Avatar';
import KebabMenu from './KebabMenu';
import { formatDistanceToNow } from 'date-fns';
import { PostCard, PostHeader, PostHeaderLeft, Username, PostCaption, PostWrapper, PlacedDate, LinkStyle } from '../styles';
import { usePlaceSaveState } from '../hooks/placeSaveState';

function Post({ postId, authorId, username, caption, place, timeOpen, onPostClick, isOwner, onEditPost, onDeletePost, onUserClick }) {
    const { savedByUsers, savedByUsernames, showAllSavedBy, setShowAllSavedBy } = usePlaceSaveState(place.id);
    const handleClick = () => {
        onPostClick(postId, place, authorId);
    };

    const handleProfileClick = (event, userId) => {
        event.stopPropagation();
        if(onUserClick) {
            onUserClick(userId);
        }
    };

    const handleKebabAction = (item) => {
        if (item.id === 'edit') {
            onEditPost(postId);
        } else if (item.id === 'delete') {
            onDeletePost(postId);
        }
    };

    const renderSavedByInfo = () => {
        if (savedByUsers.length === 0) return null;

        if (savedByUsers.length <= 3) {
            return (
                <p>
                    Saved by: {savedByUsers.map((userId, index) => (
                        <span key={userId}> 
                            <LinkStyle onClick={(e) => handleProfileClick(e, userId)}>
                                {savedByUsernames[userId]}
                            </LinkStyle>
                            {index < savedByUsers.length - 1 && ', '}
                        </span>
                    ))}
                </p>     
            );
        }

        return (
            <p>
                Saved by: {showAllSavedBy ?
                    savedByUsers.map((userId, index) => (
                        <span key={userId}> 
                            <LinkStyle onClick={(e) => handleProfileClick(e, userId)}>
                                {savedByUsernames[userId]}
                            </LinkStyle>
                            {index < savedByUsers.length - 1 && ', '}
                        </span>
                    ))
                    : `${savedByUsers.length} people`
                }
                {!showAllSavedBy && (
                    <LinkStyle onClick={(e) => { e.stopPropagation(); setShowAllSavedBy(true); }}>
                        more
                    </LinkStyle>
                    )}
            </p>
        );
    };

    return (
        <PostWrapper>
            <PostCard onClick={handleClick}>
                <PostHeader>
                    <PostHeaderLeft onClick={(e) => handleProfileClick(e, authorId)} style={{ cursor: 'pointer' }}>
                        <Avatar displayName={username} variant="profile"/>
                        <Username>{username}</Username>
                    </PostHeaderLeft>
                    {isOwner && (
                        <KebabMenu
                            items={[
                                { id: 'edit', label: 'Edit Post' },
                                { id: 'delete', label: 'Delete Post' }
                            ]}
                            onItemClick={handleKebabAction}
                        />
                    )}
                </PostHeader>
                <PostCaption>{caption}</PostCaption>
                <Place
                    restaurantName={place.restaurantName}
                    restaurantAddress={place.restaurantAddress}
                    priceLevel={place.priceLevel}
                    rating={place.rating}
                    userRatingsTotal={place.userRatingsTotal}
                    id={place.id}
                    photoReferences={place.photoReferences}
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
    onPostClick: PropTypes.func.isRequired,
    isOwner: PropTypes.bool,
    onEditPost: PropTypes.func,
    onDeletePost: PropTypes.func,
    onUserClick: PropTypes.func
};

export default Post;
