import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { H3Centered, H4, PostItem, FeedCardContent, FeedCardImage, FeedCardDetails, FeedCardPostedDate, CardWrapper } from '../styles';

function Post(props){
    return (
        <CardWrapper>
            <PostItem onClick = {() => props.whenPostClicked(props.id)}>
                <H3Centered>{props.restaurantName}</H3Centered>
                <H4>{props.restaurantAddress}</H4>
                <FeedCardContent>
                    <FeedCardImage />
                    <FeedCardDetails>
                        <p>{props.priceLevel ? '$'.repeat(props.priceLevel) : 'Price TBD'}</p>
                        <p>{props.rating ? `⭐ ${props.rating} (${props.userRatingsTotal})` : 'Rating TBD'}</p>
                    </FeedCardDetails>
                </FeedCardContent>
            </PostItem>
            <FeedCardPostedDate>{formatDistanceToNow(props.timeOpen, { addSuffix: true })}</FeedCardPostedDate>
        </CardWrapper>
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
