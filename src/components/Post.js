import React from 'react';
import PropTypes from 'prop-types';
import Place from './Place';
import Avatar from './Avatar';
import KebabMenu from './KebabMenu';
import { formatDistanceToNow } from 'date-fns';
import { PostCard, PostHeader, PostHeaderLeft, Username, PostCaption, PostWrapper, PostTime } from '../styles';

function Post({ postId, authorId, username, caption, place, timeOpen, onPostClick, isOwner, onEditPost, onDeletePost, onUserClick }) {
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

    return (
        <PostWrapper>
            <PostCard onClick={handleClick}>
                {/* User + Caption Section */}
                <PostHeader>
                    <PostHeaderLeft onClick={(e) => handleProfileClick(e, authorId)} style={{ cursor: 'pointer' }}>
                        <Avatar displayName={username} size="32px" variant="post"/>
                        <Username>{username}</Username>
                    </PostHeaderLeft>
                    <PostTime>{formatDistanceToNow(timeOpen, { addSuffix: true })}</PostTime>
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

                {/* Place Component (image + restaurant info) */}
                <Place
                    restaurantName={place.restaurantName}
                    restaurantAddress={place.restaurantAddress}
                    priceLevel={place.priceLevel}
                    rating={place.rating}
                    userRatingsTotal={place.userRatingsTotal}
                    id={place.id}
                    photoReferences={place.photoReferences}
                    variant="post"
                    whenPlaceClicked={handleClick}
                />
            </PostCard>
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
