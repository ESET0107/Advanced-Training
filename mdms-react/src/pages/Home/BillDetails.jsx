import React from "react";
import { useParams, Link } from "react-router-dom";
import HomeSidebar from "../../components/layout/HomeLayout/HomeSidebar";

const BillDetails = () => {
  const { id, status } = useParams();

  // Normally fetched from API
  const bill = {
    id,
    month: "Sep 2025",
    amount: "₹1230.00",
    dueDate: "12 Oct 2025",
    status,
    issueDate: "01 Sep 2025",
    units: "230 kWh",
    paymentMethod: "UPI / Card",
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <HomeSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Bill Details</h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="grid grid-cols-2 gap-4 mb-6 text-gray-900 dark:text-white">
            <p><strong>Bill ID:</strong> {bill.id}</p>
            <p><strong>Month:</strong> {bill.month}</p>
            <p><strong>Amount:</strong> {bill.amount}</p>
            <p><strong>Units Consumed:</strong> {bill.units}</p>
            <p><strong>Due Date:</strong> {bill.dueDate}</p>
            <p><strong>Issue Date:</strong> {bill.issueDate}</p>
            <p><strong>Status:</strong> {bill.status}</p>
            <p><strong>Payment Method:</strong> {bill.paymentMethod}</p>
          </div>

          <div className="flex gap-4">
            {bill.status === "Pending" && (
              <button className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition">
                Pay Now
              </button>
            )}
            <button className="border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white px-6 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              Download Bill
            </button>
          </div>
        </div>

        <Link
          to="/billsandpayments"
          className="text-blue-600 dark:text-blue-400 hover:underline mt-6 inline-block"
        >
          ← Back to Bills
        </Link>
      </div>
    </div>
  );
};

export default BillDetails;
