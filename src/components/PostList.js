import React from 'react';
import Post from './Post';
import PropTypes from 'prop-types';

function PostList(props){

  return (
    <React.Fragment>
      <br/ >
      {props.postList.map((post) =>
        <Post 
          whenPostClicked={props.onPostSelection}
          names={post.names}
          location={post.location}
          formattedWaitTime={post.formattedWaitTime}
          issue={post.issue}
          id={post.id}
          key={post.id}/>
      )}
    </React.Fragment>
  );
}

PostList.propTypes = {
  postList: PropTypes.array,
  onPostSelection: PropTypes.func
};

export default PostList;