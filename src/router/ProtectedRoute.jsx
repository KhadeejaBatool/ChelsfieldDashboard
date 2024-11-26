import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('valid');
    if (!isAuthenticated) {
        return <Navigate to="/auth/signin"></Navigate>;
    }
    return children;
};
export default ProtectedRoute;
