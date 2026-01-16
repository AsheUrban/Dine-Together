import React from 'react';
import Post from './Post';
import PropTypes from 'prop-types';
import { FeedContainer, H1 } from '../styles';

function PostList(props){
    return (
        <React.Fragment>
            <FeedContainer>
                {props.postList.length > 0 ? (
                    props.postList.map((post) =>
                        <Post
                            key={post.id}
                            postId={post.id}
                            authorId={post.userId}
                            username={post.authorUsername}
                            caption={post.caption}
                            timeOpen={post.timeOpen}
                            place={{
                                restaurantName: post.restaurantName,
                                restaurantAddress: post.restaurantAddress,
                                priceLevel: post.priceLevel,
                                rating: post.rating,
                                userRatingsTotal: post.userRatingsTotal,
                                id: post.placeId
                            }}
                            onPostClick={props.onPostSelection}
                            isOwner={post.isOwner}
                            onEditPost={props.onEditPost}
                            onDeletePost={props.onDeletePost}
                            onUserClick={props.onUserClick}
                        />
                    )
                ) : (
                    <H1>No restaurants have been added yet. Explore restaurants to get started!</H1>
                )}
            </FeedContainer>
        </React.Fragment>
    );
}

PostList.propTypes = {
    postList: PropTypes.array,
    onPostSelection: PropTypes.func,
    onEditPost: PropTypes.func,
    onDeletePost: PropTypes.func,
    onUserClick: PropTypes.func
};

export default PostList;