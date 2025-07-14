import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Trophy,
  Eye,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  ScanSearch,
  FileEdit,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navItemsTop = [
  { to: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
  { to: "/achievements", icon: <Trophy size={20} />, label: "Achievements" },
  {
    to: "/job-tailoring",
    icon: <ScanSearch size={20} />,
    label: "Job Analysis",
  },
  {
    to: "/resume-builder",
    icon: <FileEdit size={20} />,
    label: "Resume Builder",
  },
];

const navItemsBottom = [
  { to: "/profile", icon: <User size={20} />, label: "Profile" },
  { to: "/settings", icon: <Settings size={20} />, label: "Settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  return (
    <div
      className={`relative flex flex-col bg-white text-gray-700 border-r border-gray-200
        transition-[width] duration-300 ease-in-out
        ${open ? "w-56" : "w-16"}`}
      style={{
        height: "calc(100vh - 64px)",
        position: "sticky",
        top: "64px",
      }}
    >
      {/* Toggle button aligned middle-right of sidebar */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
        className="absolute top-1/2 -right-4 -translate-y-1/2
          flex h-8 w-8 items-center justify-center
          rounded-full border border-gray-300 bg-white
          shadow-md text-gray-600 hover:text-gray-900 focus:outline-none
          transition-colors duration-200"
      >
        {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Nav Top */}
      <nav className="flex flex-col flex-1 px-1 space-y-1 overflow-auto mt-4">
        {navItemsTop.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md
            transition-colors duration-200
            ${
              isActive
                ? "bg-gray-200 text-gray-900"
                : "hover:bg-gray-100 hover:text-gray-900 text-gray-700"
            }`
            }
          >
            <span className="flex-shrink-0">{icon}</span>
            {open && <span className="whitespace-nowrap">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <hr className="border-gray-300 my-2 mx-4" />

      {/* Nav Bottom */}
      <nav className="flex flex-col px-1 space-y-1 mb-4">
        {navItemsBottom.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md
            transition-colors duration-200
            ${
              isActive
                ? "bg-gray-200 text-gray-900"
                : "hover:bg-gray-100 hover:text-gray-900 text-gray-700"
            }`
            }
          >
            <span className="flex-shrink-0">{icon}</span>
            {open && <span className="whitespace-nowrap">{label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
