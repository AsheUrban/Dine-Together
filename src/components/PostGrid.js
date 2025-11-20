import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import {
    H1,
    H4Centered,
    PostGridStyles,
    PostWrapper,
    PostItem,
    PostContent,
    PostImage,
    PostDetails,
    PostedDate
} from '../styles';

function PostGrid(props) {
    const { postList, onPostSelection } = props;

    return (
        <>
            {postList.length > 0 ? (
                <PostGridStyles>
                    {postList.map((post) => (
                    <PostWrapper key={post.id}>
                        <PostItem onClick={() => onPostSelection(post.id)}>
                        <H4Centered>{post.restaurantName}</H4Centered>
                        <PostContent>
                            <PostImage />
                            <PostDetails>
                            <p>{post.priceLevel ? '$'.repeat(post.priceLevel) : 'Price TBD'}</p>
                            <p>{post.rating ? `⭐ ${post.rating} (${post.userRatingsTotal})` : 'Rating TBD'}</p>
                            </PostDetails>
                        </PostContent>
                        </PostItem>
                        <PostedDate>{formatDistanceToNow(post.timeOpen, {addSuffix: true})}</PostedDate>
                    </PostWrapper>
                    ))}
                </PostGridStyles>
            ) : (
                <H1>No restaurants have been added yet. Explore restaurants to get started!</H1>
            )}
        </>
    );
}

PostGrid.propTypes = {
    postList: PropTypes.array.isRequired,
    onPostSelect: PropTypes.func.isRequired
};

export default PostGrid;