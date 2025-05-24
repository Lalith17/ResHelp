import React from "react";
import { Bell, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/usercontext";
import CharAvatar from "./charAvatar";
import { useUserStore } from "../store/userstore";
import { useHandleLogout } from "../hooks/logout";
const Header = ({ setSidebarOpen }) => {
  const { clearUser } = useContext(UserContext);
  const userData = useUserStore((state) => state.userData);
  const clearUserData = useUserStore((state) => state.clearUser);
  const fullName = [userData?.fname, userData?.lname].filter(Boolean).join(" ");
  const navigate = useNavigate();
  const handleLogout = useHandleLogout();

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
      <div className="flex flex-1 items-center justify-between px-4">
        {/* Clickable Name */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            ResHelp
          </Link>
        </div>

        {/* Actions */}
        <div className="ml-4 flex items-center space-x-3 md:ml-6">
          <button className="flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">
            <Plus className="mr-1 h-4 w-4" />
            New Resume
          </button>

          {/* Notifications */}
          <button className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <Bell className="h-6 w-6" />
          </button>

          {/* Profile container */}
          <div className="relative group inline-block cursor-pointer">
            {/* Profile pic */}
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300">
              {userData?.profilePic ? (
                <img
                  src={userData.profilePic}
                  alt={fullName || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <CharAvatar
                  fullName={fullName}
                  width="w-10"
                  height="h-10"
                  style="text-l"
                />
              )}
            </div>

            {/* Dropdown aligned immediately below, no margin */}
            <div
              className="
      absolute right-0 top-full w-40 bg-white rounded-xl shadow-md py-2 z-50
      opacity-0 pointer-events-none
      group-hover:opacity-100 group-hover:pointer-events-auto
      transition-opacity duration-200
    "
              style={{ marginTop: 0 }} // ensure no gap, you can remove mt-2 if present
            >
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
