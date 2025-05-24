import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import HeaderUntyped from "./Header";

const Header = HeaderUntyped as React.FC<{
  setSidebarOpen: (open: boolean) => void;
}>;

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar below header */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main content area fills the rest */}
        <main className="flex-1 overflow-auto p-6" style={{ marginTop: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
