import React, { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Bell, User } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { i18n } = useTranslation();
  const location = useLocation();

  // Dropdown states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Refs for click outside handling
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Detect login pages
  const loginRoutes = ["/", "/login", "/signup", "/forgot", "/reset"];
  const isLoginPage = loginRoutes.includes(location.pathname);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-xl">MDMS</h1>
      </div>

      {/* Right Section */}
      <div className="flex gap-6 items-center">
        {/* Theme Toggle */}
        <div
          onClick={toggleTheme}
          className="relative w-12 h-6 flex items-center bg-gray-400 dark:bg-gray-600 rounded-full cursor-pointer transition-colors duration-300"
        >
          <div
            className={`absolute left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
              theme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {theme === "dark" ? (
              <Moon size={14} className="text-gray-800" />
            ) : (
              <Sun size={14} className="text-yellow-500" />
            )}
          </div>
        </div>

        {/* Language Selector */}
        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="border border-gray-400 rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>

        {/* Only show on home pages */}
        {!isLoginPage && (
          <>
            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg animate-fade-in">
                  <div className="p-3 font-semibold border-b border-gray-200 dark:border-gray-700">
                    Notifications
                  </div>
                  <ul className="max-h-60 overflow-y-auto text-sm">
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      🔌 Power usage unusually high today.
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      💳 Payment for September confirmed.
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      ⚡ Scheduled maintenance on Oct 20th.
                    </li>
                  </ul>
                  <div className="p-2 text-center text-blue-600 text-sm hover:underline cursor-pointer">
                    View all
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 px-2 py-1 rounded-lg transition"
              >
                <User size={20} />
                <span className="font-medium">John</span>
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg animate-fade-in">
                  <a
                    href="/profilesettings"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile Settings
                  </a>
                  <a
                    href="/login"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
