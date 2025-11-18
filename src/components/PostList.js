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
                            whenPostClicked={props.onPostSelection}
                            restaurantName={post.restaurantName}
                            restaurantAddress={post.restaurantAddress}
                            priceLevel={post.priceLevel}
                            rating={post.rating}
                            userRatingsTotal={post.userRatingsTotal}
                            timeOpen={post.timeOpen}
                            id={post.id}
                            key={post.id}/>
                    )
                ) : (
                    <H1>No restaurants have been added to the queue yet. Add a restaurant now.</H1>
                )}
            </FeedContainer>
        </React.Fragment>
    );
}

PostList.propTypes = {
    postList: PropTypes.array,
    onPostSelection: PropTypes.func
};

export default PostList;
