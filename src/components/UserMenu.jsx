import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="p-4 space-y-2">
      <Link to="/dashboard/user">Dashboard</Link><br />
      <Link to="/dashboard/user/add-lesson">Add Lesson</Link><br />
      <Link to="/dashboard/user/my-lessons">My Lessons</Link>
    </div>
  );
};

export default UserMenu;
