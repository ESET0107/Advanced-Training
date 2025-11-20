import React from "react";

const Maintenance = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-50 dark:bg-yellow-900 text-gray-800 dark:text-gray-200 text-center px-4">
      <h1 className="text-6xl font-bold mb-4">🛠️ Under Maintenance</h1>
      <p className="text-lg mb-6">
        We’re currently performing scheduled maintenance.<br />
        Please check back later.
      </p>
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-yellow-500"></div>
    </div>
  );
};

export default Maintenance;
