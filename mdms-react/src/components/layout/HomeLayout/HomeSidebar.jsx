import React from "react";
import { Home, BarChart2, Settings, LogOut, AlertTriangleIcon, PaperclipIcon, WrapTextIcon, ListIcon, ParkingMeterIcon, PersonStandingIcon, InfoIcon, Logs } from "lucide-react";
import { Link } from "react-router-dom";
import BillsPayments from "../../../pages/Home/BillsPayments";
import MeterData from "../../../pages/Home/MeterData";
import ProfileSettings from "../../../pages/Home/ProfileSettings";
const HomeSidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 text-black dark:bg-gray-900 dark:text-white h-screen flex flex-col">
      {/* <div className="p-5 text-2xl font-semibold border-b border-gray-700">
        MDMS
      </div> */}
      <nav className="flex-1 p-4 space-y-3">
        <Link to="/dashboard" className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded">
          <Home size={18} /> Dashboard
        </Link>
        <Link to="/billsandpayments" element={<BillsPayments />}className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded">
          <InfoIcon size={18} /> Bills & Payments
        </Link>
        <Link to="/meterdata" element={<MeterData />} className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded">
          <ParkingMeterIcon size={18} /> Meter Data
        </Link>
        <Link to="/alerts" className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded">
          <AlertTriangleIcon size={18} /> Alerts & Notifications
        </Link>
        <Link to="/profilesettings" element={<ProfileSettings />}className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded">
           <PersonStandingIcon size={18} />Profile & Settings
        </Link>
        <Link to="/logs" className="flex items-center gap-2 dark:hover:bg-gray-800 hover:bg-gray-200 p-2 rounded">
           <ListIcon size={18} />Logs
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

export default HomeSidebar;
