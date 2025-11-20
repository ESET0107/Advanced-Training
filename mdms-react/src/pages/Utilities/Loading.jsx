import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mb-6"></div>
      <p className="text-lg">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
