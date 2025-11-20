import React, { useState } from "react";
import ZoneSidebar from "../../components/layout/ZoneLayout/ZoneSidebar";

const ZoneSettingsNotifications = () => {
  const [activeTab, setActiveTab] = useState("settings");
  const [thresholds, setThresholds] = useState({
    highConsumption: 80,
    lowConsumption: 10,
    abnormalFrequency: 5,
    inactiveDays: 1,
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true
  });

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setThresholds({ ...thresholds, [name]: Number(value) });
  };
  const handleThresholdChange = (e) => {
    const { name, value } = e.target;
    setThresholds({ ...thresholds, [name]: value });
  };

  const handleNotificationToggle = (name) => {
    setNotifications((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <ZoneSidebar />

      {/* Main content */}
      <div className="flex-1 p-6 text-gray-800 dark:text-gray-200">
        <h1 className="text-2xl font-semibold mb-6">Settings & Notifications</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-300 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 font-medium ${
              activeTab === "settings"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Settings
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-4 py-2 font-medium ${
              activeTab === "notifications"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Notifications
          </button>
        </div>

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="space-y-8">
            <h2 className="text-lg font-semibold mb-2">
              Alert Thresholds (Adjust via Slider)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* High Consumption */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <label className="block mb-2 text-sm font-medium">
                  High Consumption Threshold (kWh)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="1"
                    name="highConsumption"
                    value={thresholds.highConsumption}
                    onChange={handleSliderChange}
                    className="w-full accent-indigo-600"
                  />
                  <span className="w-12 text-right font-semibold">
                    {thresholds.highConsumption} kWh
                  </span>
                </div>
              </div>

              {/* Low Consumption */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <label className="block mb-2 text-sm font-medium">
                  Low Consumption Threshold (kWh)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="1"
                    name="lowConsumption"
                    value={thresholds.lowConsumption}
                    onChange={handleSliderChange}
                    className="w-full accent-indigo-600"
                  />
                  <span className="w-12 text-right font-semibold">
                    {thresholds.lowConsumption} kWh
                  </span>
                </div>
              </div>

              {/* Abnormal Frequency */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <label className="block mb-2 text-sm font-medium">
                  Abnormal Frequency Reading (hours)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    name="abnormalFrequency"
                    value={thresholds.abnormalFrequency}
                    onChange={handleSliderChange}
                    className="w-full accent-indigo-600"
                  />
                  <span className="w-12 text-right font-semibold">
                    {thresholds.abnormalFrequency} hrs
                  </span>
                </div>
              </div>

              {/* Inactive Meters Duration */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <label className="block mb-2 text-sm font-medium">
                  Inactive Meters Duration (days)
                </label>
                <input
                  type="number"
                  name="inactiveDays"
                  value={thresholds.inactiveDays}
                  onChange={handleThresholdChange}
                  className="w-full px-3 py-2 rounded-lg border dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                />
                <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                  Example: 1 day = Sunday.
                </p>
              </div>
            </div>

            <div className="text-right">
              <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-2">
              Notification Preferences
            </h2>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm space-y-4">
              {Object.keys(notifications).map((key) => (
                <div
                  key={key}
                  className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3"
                >
                  <span className="capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <button
                    onClick={() => handleNotificationToggle(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications[key]
                        ? "bg-indigo-600"
                        : "bg-gray-400 dark:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications[key] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZoneSettingsNotifications;