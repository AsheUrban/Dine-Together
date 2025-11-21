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
                            place={post}
                            onPostClick={props.onPostSelection}
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
    onPostSelection: PropTypes.func
};

export default PostList;