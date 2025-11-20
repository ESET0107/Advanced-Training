import React from "react";
import { useNavigate } from "react-router-dom";
import HomeSidebar from "../../components/layout/HomeLayout/HomeSidebar";

const BillsPayments = () => {
  const navigate = useNavigate();

  const bills = [
    { id: 1, month: "Sep 2025", amount: "₹1230.00", dueDate: "12 Oct", status: "Pending" },
    { id: 2, month: "Aug 2025", amount: "₹1180.00", dueDate: "12 Sep", status: "Paid" },
    { id: 3, month: "Jul 2025", amount: "₹1150.00", dueDate: "12 Aug", status: "Paid" },
    { id: 4, month: "Jun 2025", amount: "₹1200.00", dueDate: "12 Jul", status: "Pending" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <HomeSidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">My Bills</h1>

        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5">
          <table className="w-full text-left border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 border border-gray-200 dark:border-gray-700 dark:text-white">Month</th>
                <th className="p-3 border border-gray-200 dark:border-gray-700 dark:text-white">Amount</th>
                <th className="p-3 border border-gray-200 dark:border-gray-700 dark:text-white">Due Date</th>
                <th className="p-3 border border-gray-200 dark:border-gray-700 dark:text-white">Status</th>
                <th className="p-3 border border-gray-200 dark:border-gray-700 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr
                  key={bill.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-3 text-gray-900 dark:text-white">{bill.month}</td>
                  <td className="p-3 text-gray-900 dark:text-white">{bill.amount}</td>
                  <td className="p-3 text-gray-900 dark:text-white">{bill.dueDate}</td>
                  <td
                    className={`p-3 font-medium ${
                      bill.status === "Paid" ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {bill.status}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/bill/${bill.id}/${bill.status}`)}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View / Pay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-4 text-gray-600 dark:text-gray-300">
            <button className="cursor-not-allowed text-gray-400 dark:text-gray-500">&larr; Previous</button>
            <button className="bg-blue-600 dark:bg-blue-500 text-white rounded-full w-8 h-8">1</button>
            <button className="text-gray-500 dark:text-gray-400">2</button>
            <span>...</span>
            <button className="text-gray-500 dark:text-gray-400">68</button>
            <button className="text-blue-600 dark:text-blue-400">Next &rarr;</button>
          </div>

          <p className="mt-6 text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Note:</span> All bills are generated on the 1st of each month.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillsPayments;
