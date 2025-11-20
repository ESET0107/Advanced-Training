import React from "react";
import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 dark:bg-red-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-8xl font-bold text-red-600">403</h1>
      <p className="text-xl mb-6">Access Denied. You don’t have permission to view this page.</p>
      <Link
        to="/login"
        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default AccessDenied;
