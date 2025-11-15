import React from 'react';
import Post from './Post';
import PropTypes from 'prop-types';
import { PostListTitle, DineTogetherPosts, H1 } from '../styles';

function PostList(props){
    return (
        <React.Fragment>
            <DineTogetherPosts>
                <PostListTitle>Restaurant List </PostListTitle>
                <hr />
                {props.postList.length > 0 ? (
                    props.postList.map((post) =>
                        <Post
                            whenPostClicked={props.onPostSelection}
                            restaurantName={post.restaurantName}
                            restaurantAddress={post.restaurantAddress}
                            formattedWaitTime={post.formattedWaitTime}
                            reservationNotes={post.reservationNotes}
                            id={post.id}
                            key={post.id}/>
                    )
                ) : (
                    <H1>No restaurants have been added to the queue yet. Add a restaurant now.</H1>
                )}
            </DineTogetherPosts>
        </React.Fragment>
    );
}

PostList.propTypes = {
    postList: PropTypes.array,
    onPostSelection: PropTypes.func
};

export default PostList;
