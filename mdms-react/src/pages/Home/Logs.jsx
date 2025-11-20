import React from "react";
import HomeSidebar from "../../components/layout/HomeLayout/HomeSidebar";

const Logs = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <HomeSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6">Logs</h1>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3">User Interaction Logs</h2>
          <p className="text-gray-500 mb-3">
            (This will store logs in IndexedDB and upload them periodically.)
          </p>

          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Timestamp</th>
                <th className="p-2">Action</th>
                <th className="p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">2025-10-16 10:30 AM</td>
                <td className="p-2">Visited Page</td>
                <td className="p-2">Dashboard</td>
              </tr>
              <tr>
                <td className="p-2">2025-10-16 10:32 AM</td>
                <td className="p-2">Viewed Data</td>
                <td className="p-2">Meter Usage</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Upload Logs
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              Clear Local Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
