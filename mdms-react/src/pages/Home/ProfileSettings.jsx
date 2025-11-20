import React, { useState } from "react";
import HomeSidebar from "../../components/layout/HomeLayout/HomeSidebar";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <HomeSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Profile & Settings
        </h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-300 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 font-medium ${
              activeTab === "profile"
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2 font-medium ${
              activeTab === "security"
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab("notification")}
            className={`px-4 py-2 font-medium ${
              activeTab === "notification"
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Notification
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 space-y-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-900 dark:bg-gray-200 flex items-center justify-center text-white dark:text-black text-3xl relative">
                <span>User</span>
                <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center cursor-pointer">
                  ✎
                </span>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
                  value="XYZ User"
                />
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
                  value="xyz@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-300">Mobile No.</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
                  value="+91 9809892782"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save & continue
              </button>
            </form>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 space-y-4">
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 dark:text-gray-300">Current Password</label>
                <input
                  type="password"
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div >
                <label className="block text-gray-600 dark:text-gray-300">New Password</label>
                <input
                  type="password"
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-300">Confirm Password</label>
                <input
                  type="password"
                  className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save & continue
              </button>
            </form>
          </div>
        )}

        {/* Notification Tab */}
        {activeTab === "notification" && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 space-y-4">
            <form className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">Email Notifications</label>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">SMS Notifications</label>
                <input type="checkbox" className="w-5 h-5 accent-blue-600" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">Push Notifications</label>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save & continue
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
