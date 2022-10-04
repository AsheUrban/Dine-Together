import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function PostDetail(props){
  const { post, onClickingDelete, onClickingEdit } = props; 

  const DineTogetherPosts = styled.div`
  background-color: #E7DDEE;
  width: 300px;
  margin: auto;
  padding: 45px;
  border: 2px solid #fffbc8;
  text-align: center;
  border-radius: 10px;
  `;
  
  const DineTogetherPost = styled.div`
  background-color: ;
  width: 1280px;
  margin: auto;
  border: 2px solid #FFFBC8;
  padding-top: 150px;
  padding-bottom: 150px;
  border-radius: 10px;
  `;

  const H3 = styled.h3`
  font-size: 22px;
  color: #FFFBC8;
`;

  const Button = styled.button`
    background-color: #B16825;
    border: 2px solid #FFFBC8;
    margin: 10px;
    color: #FFFBC8;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
  `;

  return (
    <React.Fragment>
      <DineTogetherPost>
        <DineTogetherPosts>
        <h2>Post Detail</h2>
        <H3>{post.location} - {post.names}</H3>
        <p><em>{post.issue}</em></p>
        <Button onClick={onClickingEdit}>Update Post</Button>
        <Button onClick={()=> onClickingDelete(post.id)}>Close Post</Button>
        
        </DineTogetherPosts>
      </DineTogetherPost>
    </React.Fragment>
  );
}

PostDetail.propTypes = {
  post: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func 
};

export default PostDetail;