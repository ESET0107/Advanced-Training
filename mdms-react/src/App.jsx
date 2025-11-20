import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
//import Sidebar from "./components/layout/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/SignUp";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import "./i18n/i18n";
import "./index.css";


import Dashboard from "./pages/Home/Dashboard";
import MeterData from "./pages/Home/MeterData";
import ProfileSettings from "./pages/Home/ProfileSettings";
import BillsPayments from "./pages/Home/BillsPayments";
import Logs from "./pages/Home/Logs";
import AlertsNotifications from "./pages/Home/AlertsNotifications";

import BillDetails from "./pages/Home/BillDetails";


import NotFound from "./pages/utilities/404";
import ServerError from "./pages/utilities/500";
import Maintenance from "./pages/utilities/Maintenance";
import AccessDenied from "./pages/utilities/AccessDenied";
import Loading from "./pages/utilities/Loading";

import ZoneDashboard from "./pages/ZoneHome/ZoneDashboard";
import ZoneMeterManagement from "./pages/ZoneHome/ZoneMeterManagement";
import ZoneUserManagement from "./pages/ZoneHome/ZoneUserManagement";
import ZoneReportsAnalytics from "./pages/ZoneHome/ZoneReportsAnalytics";
import ZoneSettingsNotifications from "./pages/ZoneHome/ZoneSettingsNotifications";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminZones from "./pages/Admin/AdminZones";
import AdminMeters from "./pages/Admin/AdminMeters";
import AdminUsers from "./pages/Admin/AdminUsers";
// import AdminAuditLogs from "./pages/Admin/AdminAuditLogs";
// import AdminSettings from "./pages/Admin/AdminSettings";
function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
            {/* <Sidebar /> */}
            <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/reset" element={<ResetPassword />} />

                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/meterdata" element={<MeterData />} />
                <Route path="/profilesettings" element={<ProfileSettings />} />
                <Route path="/billsandpayments" element={<BillsPayments />} />
                <Route path="/logs" element={<Logs />} />
                <Route path="/alerts" element={<AlertsNotifications />} />

                <Route path="/bill/:id/:status" element={<BillDetails />} />


                <Route path="/404" element={<NotFound />} />
                <Route path="/500" element={<ServerError />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/accessdenied" element={<AccessDenied />} />
                <Route path="/loading" element={<Loading />} />
                {/* Fallback route */}
                <Route path="*" element={<NotFound />} />

                <Route path="zonedashboard" element={<ZoneDashboard/>} />
                <Route path="zonemetermanagement" element={<ZoneMeterManagement/>} />
                <Route path="zoneusermanagement" element={<ZoneUserManagement/>} />
                <Route path="zonereportsanalytics" element={<ZoneReportsAnalytics/>} />
                <Route path="zonesettingsnotifications" element={<ZoneSettingsNotifications/>} />

                <Route path="admin/dashboard" element={<AdminDashboard/>} />
                <Route path="admin/zones" element={<AdminZones/>} />
                <Route path="admin/meters" element={<AdminMeters/>} />
                <Route path="admin/users" element={<AdminUsers/>} />
                {/* <Route path="admin/audit-logs" element={<AdminAuditLogs/>} />
                <Route path="admin/settings" element={<AdminSettings/>} /> */}

              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
