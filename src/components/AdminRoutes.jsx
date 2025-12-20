const AdminRoutes = () => {
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-20 text-2xl">Checking Admin...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (userData?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
