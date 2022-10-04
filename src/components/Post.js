import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Post(props){

  const H3 = styled.h3`
  font-size: 22px;
  color: #FFFBC8;
  `

  return (
    
    <React.Fragment>
      <div onClick = {() => props.whenPostClicked(props.id)}>
        <H3>{props.location} - {props.names}</H3>
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