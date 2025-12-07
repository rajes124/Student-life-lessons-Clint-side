import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // For now simple check — later role check add korba
  if (!user || user.email !== "admin@example.com")
    return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
