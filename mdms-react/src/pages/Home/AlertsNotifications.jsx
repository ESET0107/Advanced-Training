import React, { useState } from "react";
import HomeSidebar from "../../components/layout/HomeLayout/HomeSidebar";

// Sample notifications grouped by day
const notificationsData = [
  {
    id: 1,
    date: "2025-10-20",
    time: "08:30 AM",
    type: "red",
    title: "⚠️ Unusual Spike in Power Consumption",
    details:
      "We detected an unusual spike in your electricity usage at 8:30 AM on 20 Oct 2025. Please check your appliances or meter for discrepancies.",
  },
  {
    id: 2,
    date: "2025-10-20",
    time: "11:00 AM",
    type: "yellow",
    title: "⚠️ Meter Reading Delayed",
    details:
      "Your meter reading for Sep 2025 is delayed. Ensure your meter is accessible for the technician to complete the reading.",
  },
  {
    id: 3,
    date: "2025-10-19",
    time: "02:15 PM",
    type: "green",
    title: "✅ Payment Received Successfully",
    details:
      "Payment of ₹1,230 for Sep 2025 received successfully on 19 Oct 2025. Thank you!",
  },
  {
    id: 4,
    date: "2025-10-19",
    time: "09:45 AM",
    type: "yellow",
    title: "⚠️ Scheduled Maintenance",
    details:
      "Scheduled electricity maintenance will occur on 21 Oct 2025 from 10:00 AM to 2:00 PM. Expect temporary downtime.",
  },
  {
    id: 5,
    date: "2025-10-18",
    time: "05:30 PM",
    type: "red",
    title: "⚠️ Overdue Bill Reminder",
    details:
      "Your Aug 2025 electricity bill of ₹1,180 is overdue. Please make payment to avoid late fees.",
  },
];

const AlertsNotifications = () => {
  const [selectedNotification, setSelectedNotification] = useState(notificationsData[0]);

  const getColorClasses = (type) => {
    switch (type) {
      case "red":
        return "bg-red-50 dark:bg-red-800 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300";
      case "yellow":
        return "bg-yellow-50 dark:bg-yellow-800 border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300";
      case "green":
        return "bg-green-50 dark:bg-green-800 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300";
      default:
        return "";
    }
  };

  // Group notifications by date
  const notificationsByDate = notificationsData.reduce((acc, notif) => {
    if (!acc[notif.date]) acc[notif.date] = [];
    acc[notif.date].push(notif);
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <HomeSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 flex gap-6 overflow-y-auto">
        {/* Left Pane - Notification List */}
        <div className="w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow p-4 overflow-y-auto max-h-[80vh]">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Notifications
          </h2>
          {Object.keys(notificationsByDate)
            .sort((a, b) => new Date(b) - new Date(a))
            .map((date) => (
              <div key={date} className="mb-4">
                <p className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
                  {new Date(date).toDateString()}
                </p>
                <ul className="space-y-2">
                  {notificationsByDate[date].map((notif) => (
                    <li
                      key={notif.id}
                      onClick={() => setSelectedNotification(notif)}
                      className={`cursor-pointer p-3 rounded-lg border ${getColorClasses(
                        notif.type
                      )} ${
                        selectedNotification.id === notif.id
                          ? "ring-2 ring-blue-500 dark:ring-blue-400"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between">
                        <span>{notif.title}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-300">
                          {notif.time}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        {/* Right Pane - Notification Details with top line */}
        <div className="w-2/3 bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-h-[80vh] overflow-y-auto">
          {/* Top line with title, date, and time */}
          <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
            <p className="text-gray-900 dark:text-white font-semibold">
              {selectedNotification.title}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {new Date(selectedNotification.date).toDateString()} • {selectedNotification.time}
            </p>
          </div>

          {/* Full notification details/content */}
          <p className="text-gray-900 dark:text-white">{selectedNotification.details}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertsNotifications;
