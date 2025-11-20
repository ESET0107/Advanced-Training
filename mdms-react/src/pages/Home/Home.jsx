import React from "react";
import HomeHeader from "../../components/layout/HomeLayout/HomeHeader";
import HomeSidebar from "../../components/layout/HomeLayout/HomeSidebar";

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <HomeSidebar />
      <div className="flex-1 flex flex-col">
        {/* <HomeHeader /> */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6">Welcome, User 👋</h2>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Total Users</h3>
              <p className="text-2xl font-semibold">120</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Active Meters</h3>
              <p className="text-2xl font-semibold">85</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Alerts</h3>
              <p className="text-2xl font-semibold text-red-500">5</p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">
              Electricity Consumption Overview
            </h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Graph section (coming soon)
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
