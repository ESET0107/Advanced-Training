import React from "react";

const HomeHeader = () => {
  return (
    <header className="bg-white shadow-md flex justify-between items-center px-6 py-3">
      <h1 className="text-2xl font-semibold text-gray-800">MDMS Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Light/Dark
        </button>
        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
          EN / ES
        </button>
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className="rounded-full w-10 h-10 border"
        />
      </div>
    </header>
  );
};

export default HomeHeader;
