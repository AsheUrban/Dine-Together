import React, { useState, useEffect } from 'react';
import Header from './Header';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Feed from './Feed';
import Explore from './Explore';
import ProtectedRoute from './ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from '../firebase.js';
import UserProfile from './UserProfile';

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
            <Routes>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/' element={<ProtectedRoute element={<Feed />} />} />
            <Route path='/profile/:userId' element={<ProtectedRoute element={<UserProfile />} />} />
            <Route path='/search' element={<ProtectedRoute element ={<Explore />} />} />
            </Routes>
        </Router>
    );
}

export default App;
