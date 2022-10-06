import React from 'react';
import Header from './Header';
import SignIn from './SignIn';
import PostControl from './PostControl';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from './Background';
import Footer from './Footer';

function App(){
  return (
    <Router>
      <Header />
      <Background />
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/' element={<PostControl />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
