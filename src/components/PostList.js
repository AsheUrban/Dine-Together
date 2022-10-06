import React from 'react';
import Post from './Post';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const DineTogetherPosts = styled.div`
background-color: #E7DDEE;
width: 300px;
margin: auto;
margin-top: 50px;
padding: 45px;
border: 2px solid #fffbc8;
text-align: center;
border-radius: 10px;
`;

function PostList(props){

  return (
    <React.Fragment>
        <DineTogetherPosts>
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
        </DineTogetherPosts>
    </React.Fragment>
  );
}

PostList.propTypes = {
  postList: PropTypes.array,
  onPostSelection: PropTypes.func
};

export default PostList;