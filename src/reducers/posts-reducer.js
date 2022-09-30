import * as c from '../actions/ActionTypes';

const postsReducer = (state, action) => {
  switch (action.type) {
    case c.GET_POSTS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        posts: action.posts
      };
    case c.GET_POSTS_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      }
    default:
      throw new Error(`There is no action matching ${action.type}.`);
  }
};

export default postsReducer;