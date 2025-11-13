import React, { useState, useEffect } from 'react';
import Header from './Header';
import SignIn from './SignIn';
import PostControl from './PostControl';
import ProtectedRoute from './ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from '../firebase.js';
import Profile from './Profile';
import Background from './Background';
import Footer from './Footer';

function App(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Header user={user} />
      <Background />
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/' element={<ProtectedRoute element={<PostControl />} />} />
        <Route path='/profile/:userId' element={<ProtectedRoute element={<Profile />} />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
