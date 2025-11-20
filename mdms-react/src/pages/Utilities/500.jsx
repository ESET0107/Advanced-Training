import React from "react";
import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-9xl font-bold">500</h1>
      <p className="text-xl mb-6">Internal Server Error. Something went wrong on our side.</p>
      <Link
        to="/home"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Go Back
      </Link>
    </div>
  );
};

export default ServerError;
