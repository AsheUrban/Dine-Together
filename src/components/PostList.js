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

const H1 = styled.h1`
  font-size: 30px;
  color: #700629;
  margin: 0;
  `;

function PostList(props){

  return (
    <React.Fragment>
        <DineTogetherPosts>
          <br/ >
          {props.postList.map((post) =>
            <Post
              whenPostClicked={props.onPostSelection}
              restaurantName={post.restaurantName}
              restaurantAddress={post.restaurantAddress}
              formattedWaitTime={post.formattedWaitTime}
              reservationNotes={post.reservationNotes}
              id={post.id}
              key={post.id}/>
          )}
          <H1>No restaurants have been added to the queue yet. Add a restaurant now.</H1>
        </DineTogetherPosts>
    </React.Fragment>
  );
}

PostList.propTypes = {
  postList: PropTypes.array,
  onPostSelection: PropTypes.func
};

export default PostList;