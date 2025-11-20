import React from "react";
import {
Home,
BarChart2,
Settings,
LogOut,
AlertTriangle,
UserCog,
ClipboardList,
Building2,
Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
return (
<aside className="w-64 bg-gray-100 text-black dark:bg-gray-900 dark:text-white h-screen flex flex-col">

  <nav className="flex-1 p-4 space-y-3">
    <Link
      to="/admin/dashboard"
      className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded"
    >
      <Home size={18} /> Dashboard
    </Link>

    <Link
      to="/admin/zones"
      className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded"
    >
      <Building2 size={18} /> Zone Management
    </Link>

    <Link
      to="/admin/meters"
      className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded"
    >
      <Activity size={18} /> Meter Management
    </Link>

    <Link
      to="/admin/users"
      className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded"
    >
      <UserCog size={18} /> User & Role Management
    </Link>

    <Link
      to="/admin/audit-logs"
      className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded"
    >
      <ClipboardList size={18} /> Audit Logs
    </Link>

    <Link
      to="/admin/settings"
      className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded"
    >
      <Settings size={18} /> Settings & Configuration
    </Link>
  </nav>

  <div className="p-4 border-t border-gray-700">
    <button className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded w-full">
      <LogOut size={18} /> Logout
    </button>
  </div>
</aside>


);
};

export default AdminSidebar;