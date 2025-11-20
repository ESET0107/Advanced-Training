import React from "react";
import HomeSidebar from "../../components/layout/HomeLayout/HomeSidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <HomeSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5">
            <p className="text-gray-500 dark:text-gray-300">Current Consumption</p>
            <h2 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">256 kWh</h2>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5">
            <p className="text-gray-500 dark:text-gray-300">This Month’s Bill</p>
            <h2 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">₹1,230 Due on 12 Oct</h2>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5">
            <p className="text-gray-500 dark:text-gray-300">Outstanding Balance</p>
            <h2 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">₹120 Pending</h2>
          </div>
        </div>

        {/* Last Payment Info */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 mb-8">
          <p className="text-gray-500 dark:text-gray-300">Last Payment</p>
          <h2 className="text-xl font-semibold mt-2 text-gray-900 dark:text-white">Paid ₹1,200 on 10 Sep</h2>
        </div>

        {/* Placeholder for graph */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Electricity Consumption Overview</h2>
          <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-300 border-2 border-dashed rounded-lg">
            Graph will be displayed here (Day / Week / Month)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
