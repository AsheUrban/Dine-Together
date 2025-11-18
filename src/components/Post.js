import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { H3Centered, H4, PostItem, PostContent, PostImage, PostDetails, PostedDate } from '../styles';

function Post(props){
    return (
        <PostItem onClick = {() => props.whenPostClicked(props.id)}>
            <H3Centered>{props.restaurantName}</H3Centered>
            <H4>{props.restaurantAddress}</H4>
            <PostContent>
                <PostImage />
                <PostDetails>
                    <p>{props.priceLevel ? '$'.repeat(props.priceLevel) : 'Price TBD'}</p>
                    <p>{props.rating ? `⭐ ${props.rating} (${props.userRatingsTotal})` : 'Rating TBD'}</p>
                </PostDetails>
            </PostContent>
            <PostedDate>{formatDistanceToNow(props.timeOpen, { addSuffix: true })}</PostedDate>
        </PostItem>
    );
}

Post.propTypes = {
    restaurantName: PropTypes.string,
    restaurantAddress: PropTypes.string,
    priceLevel: PropTypes.number,
    rating: PropTypes.number,
    userRatingsTotal: PropTypes.number,
    timeOpen: PropTypes.object,
    id: PropTypes.string,
    whenPostClicked: PropTypes.func
}

export default Post;
