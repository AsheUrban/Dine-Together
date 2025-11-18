import React from 'react';
import PropTypes from 'prop-types';
import { H3, H4, PostItem } from '../styles';

function Post(props){
    return (
        <React.Fragment>
            <hr />
            <PostItem onClick = {() => props.whenPostClicked(props.id)}>
                <H3>{props.restaurantName}</H3>
                <H4>{props.restaurantAddress}</H4>
                <p><em>{props.notes}</em></p>
                <p><em>{props.formattedWaitTime}</em></p>
            </PostItem>
        </React.Fragment>
    );
}

Post.propTypes = {
    restaurantName: PropTypes.string,
    restaurantAddress: PropTypes.string,
    notes: PropTypes.string,
    id: PropTypes.string,
    whenPostClicked: PropTypes.func
}

export default Post;
