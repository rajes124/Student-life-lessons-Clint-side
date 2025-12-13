import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoutes = () => {
  const { currentUser, userData } = useAuth(); // userData = MongoDB থেকে fetched

  if (!currentUser) return <Navigate to="/login" />;
  if (!userData?.isAdmin) return <Navigate to="/dashboard" />;

  return <Outlet />;
};

export default AdminRoutes;