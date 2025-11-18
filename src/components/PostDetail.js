import React from 'react';
import PropTypes from 'prop-types';
import { PostContainer, H2Centered, H4, PostActionButton } from '../styles';

function PostDetail(props){
    const { post, onClickingDelete, onClickingEdit } = props;

    return (
        <React.Fragment>
            <PostContainer>
                <H2Centered>{post.restaurantName}</H2Centered>
                <H4>{post.restaurantAddress}</H4>
                <p><em>{post.reservationNotes}</em></p>
                <PostActionButton onClick={onClickingEdit}>Update Restaurant</PostActionButton>
                <PostActionButton onClick={()=> onClickingDelete(post.id)}>Delete Restaurant</PostActionButton>
            </PostContainer>
        </React.Fragment>
    );
}

PostDetail.propTypes = {
    post: PropTypes.object,
    onClickingDelete: PropTypes.func,
    onClickingEdit: PropTypes.func
};

export default PostDetail;
