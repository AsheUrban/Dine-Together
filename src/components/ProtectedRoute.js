import { Navigate } from 'react-router-dom';
import { auth } from '../firebase.js';

function ProtectedRoute({ element }) {
    return auth.currentUser ? element : <Navigate to="/sign-in" replace />;
}

export default ProtectedRoute;
