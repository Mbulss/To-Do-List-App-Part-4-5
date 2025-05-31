import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { user, isLoggedOut } = useSelector((state) => state.auth);

  if (!user || isLoggedOut) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute; 