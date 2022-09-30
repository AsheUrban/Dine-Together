import * as c from './ActionTypes';

export const getPostsSuccess = (parks) => ({
  type: c.GET_POSTS_SUCCESS,
  parks
});

export const getPostsFailure = (error) => ({
  type: c.GET_POSTS_FAILURE,
  error
});