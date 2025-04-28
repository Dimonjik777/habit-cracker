import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { useSidebar } from "../contexts/SidebarContext";
import { useUser } from "../contexts/UserContext";
import ThemeToggle from "./ThemeToggle";
import { useLocation, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const { openLeftSidebar, openRightSidebar } = useSidebar();
  const { user } = useUser();
  const location = useLocation();
  return (
    <>
      <LeftSidebar />
      <div className="dashboard">
        <div className="header">
          <div className="sidebar-toggle" onClick={openLeftSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="sidebar-toggle --right" onClick={openRightSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="dashboard__info">
          {location.pathname === "/dashboard/all" && (
            <h2>Hi there, {user.name}</h2>
          )}
          {location.pathname === "/dashboard/statistics" && <h2>Statistics</h2>}
          <ThemeToggle />
        </div>
        <Outlet />
      </div>
      <RightSidebar />
    </>
  );
}
