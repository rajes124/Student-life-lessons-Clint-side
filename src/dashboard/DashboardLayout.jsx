import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import AdminMenu from "../components/AdminMenu";

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "220px", borderRight: "1px solid gray" }}>
        <h3>User Menu</h3>
        <UserMenu />
        <hr />
        <h3>Admin Menu</h3>
        <AdminMenu />
      </div>

      <div style={{ padding: "20px", flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
