import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function PostDetail(props){
  const { post, onClickingDelete, onClickingEdit } = props; 

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
  `

  const H2 = styled.h2`
  font-size: 26px;
  color: #700629;
  `

  const H3 = styled.h3`
  font-size: 22px;
  color: #FFFBC8;
`;

const Button = styled.button`
  background-color: #700629;
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
        <DineTogetherPosts>
        <H1>Restaurant Details</H1>
        <hr />
        <H1>{post.names}</H1>
        <H3>{post.location}</H3>
        <p><em>{post.issue}</em></p>
        <Button onClick={onClickingEdit}>Update Post</Button>
        <Button onClick={()=> onClickingDelete(post.id)}>Close Post</Button>
        </DineTogetherPosts>
    </React.Fragment>
  );
}

PostDetail.propTypes = {
  post: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func 
};

export default PostDetail;