import React from 'react';
import PropTypes from 'prop-types';
import { PostName, PostAddress } from '../styles';

function Post(props){
  return (
    
    <React.Fragment>
      <div onClick = {() => props.whenPostClicked(props.id)}>
        <PostName>{props.restaurantName}</PostName>
        <PostAddress>{props.restaurantAddress}</PostAddress>
        <p><em>{props.reservationNotes}</em></p>
        <p><em>{props.formattedWaitTime}</em></p>
      </div>
    </React.Fragment>
  );
}

Post.propTypes = {
  restaurantName: PropTypes.string,
  restaurantAddress: PropTypes.string,
  reservationNotes: PropTypes.string,
  formattedWaitTime: PropTypes.string,
  id: PropTypes.string,
  whenPostClicked: PropTypes.func
}

export default Post;