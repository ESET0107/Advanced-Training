import React from "react";
import { Home, BarChart2, Settings, LogOut, AlertTriangleIcon, PaperclipIcon, WrapTextIcon, ListIcon, ParkingMeterIcon, PersonStandingIcon, InfoIcon, Logs } from "lucide-react";
import { Link } from "react-router-dom";
import ZoneDashboard from "../../../pages/ZoneHome/ZoneDashboard";
import ZoneMeterManagement from "../../../pages/ZoneHome/ZoneMeterManagement";
import ZoneUserManagement from "../../../pages/ZoneHome/ZoneUserManagement";
import ZoneReportsAnalytics from "../../../pages/ZoneHome/ZoneReportsAnalytics";
import ZoneSettingsNotifications from "../../../pages/ZoneHome/ZoneSettingsNotifications";
const ZoneSidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 text-black dark:bg-gray-900 dark:text-white h-screen flex flex-col">
        <nav className="flex-1 p-4 space-y-3">
        <Link to="/zonedashboard" element={<ZoneDashboard />} className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded">
          <Home size={18} /> Dashboard
        </Link>
        <Link to="/zonemetermanagement" element={<ZoneMeterManagement />} className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded">
          <ParkingMeterIcon size={18} /> Meter Management
        </Link>
        <Link to="/zoneusermanagement" element={<ZoneUserManagement />} className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded">
          <PersonStandingIcon size={18} /> User Management
        </Link>
        <Link to="/zonereportsanalytics" element={<ZoneReportsAnalytics />}className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded">
          <AlertTriangleIcon size={18} /> Reports & Analytics
        </Link>
        <Link to="/zonesettingsnotifications" element={<ZoneSettingsNotifications />}className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded">
           <PersonStandingIcon size={18} /> Settings & Notifications
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

export default ZoneSidebar;