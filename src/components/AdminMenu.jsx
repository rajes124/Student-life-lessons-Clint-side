import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="p-4 space-y-2">
      <Link to="/dashboard/admin">Admin Home</Link><br />
      <Link to="/dashboard/admin/manage-users">Manage Users</Link><br />
      <Link to="/dashboard/admin/manage-lessons">Manage Lessons</Link>
    </div>
  );
};

export default AdminMenu;
