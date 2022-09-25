import React from 'react';
import Header from './Header';
import SignIn from './SignIn';
import PostControl from './PostControl';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from './RestaurantList';

function App(){
  return (
    <Router>
      <Header />
      <RestaurantList />
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/' element={<PostControl />} />
      </Routes>
    </Router>
  );
}
export default App;
