import React, { useEffect, useReducer } from 'react';
import postsReducer from '../reducers/posts-reducer';
import { getPostsFailure, getPostsSuccess } from './../actions/index';

const initialState = {
  isLoaded: false,
  posts: [],
  error: null
};

function Posts() {
  const [state, dispatch] = useReducer(postsReducer, initialState);

useEffect(() => {
  
  fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.REACT_APP_GOOGLEPLACES_API_KEY}&fields=name&place_id=ChIJN1t_tDeuEmsRUsoyG83frY4`,
    // { 
    //   mode: 'cors',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': 'maps.googleapis.com'
    //   },
    // }
  )
    .then(response => {
        if(!response.ok) {
          console.log(response);
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          console.log(response);
          return response.json();
        }
      })
    .then((jsonifiedResponse) => {
      const action = getPostsSuccess(jsonifiedResponse.result)
      dispatch(action);
    })
    .catch((error) => {
      const action = getPostsFailure(error.message)
      dispatch(action);
    });
  }, [])

  const { error, isLoaded, posts } = state;

  if(error) {
    return <h1>Error: {error}</h1>;
  } else if (!isLoaded) {
    return <h1>...Loading...</h1>;
  } else {
    return (
      <React.Fragment>
        <h1>RestauarantList</h1>
        <ul> 
          {posts.map((posts, index) =>
          <li key={index}>
            <h3>{posts.name}</h3>
            {/* <p>{posts.description}</p> */}
          </li>
          )}
        </ul>
      </React.Fragment>
    );
  }
}

export default Posts;