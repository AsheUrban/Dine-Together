import React from 'react';
import Post from './Post';
import PropTypes from 'prop-types';
import { H1, PostGridStyles } from '../styles';

function PostGrid(props) {
    const { postList, onPostSelection } = props;

    return (
        <>
            {postList.length > 0 ? (
                <PostGridStyles>
                    {postList.map((post) => (
                        <Post
                            key={post.id}
                            postId={post.id}
                            authorId={post.userId}
                            username={post.authorUsername}
                            caption={post.caption}
                            place={{
                                restaurantName: post.restaurantName,
                                restaurantAddress: post.restaurantAddress,
                                priceLevel: post.priceLevel,
                                rating: post.rating,
                                userRatingsTotal: post.userRatingsTotal,
                                timeOpen: post.timeOpen,
                                id: post.placeId
                            }}
                             onPostClick={onPostSelection}
                        />
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
    onPostSelection: PropTypes.func.isRequired
};

export default PostGrid;
