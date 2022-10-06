import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Post(props){

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

  return (
    
    <React.Fragment>
      <H1>Restaurant List</H1>
      <hr />
      <div onClick = {() => props.whenPostClicked(props.id)}>
        <H2>{props.names}</H2>
        <H3>{props.location}</H3>
        <p><em>{props.issue}</em></p>
        <p><em>{props.formattedWaitTime}</em></p>
      </div>
    </React.Fragment>
  );
}

Post.propTypes = {
  names: PropTypes.string,
  location: PropTypes.string,
  issue: PropTypes.string,
  formattedWaitTime: PropTypes.string,
  id: PropTypes.string,
  whenPostClicked: PropTypes.func
}

export default Post;