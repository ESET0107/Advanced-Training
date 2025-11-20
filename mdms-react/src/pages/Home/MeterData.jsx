import React, { useState } from "react";
import HomeSidebar from "../../components/layout/HomeLayout/HomeSidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MeterData = () => {
  const [range, setRange] = useState("day");

  // ====== DUMMY DATASETS ======
  const dataSets = {
    day: [
      { name: "01 Sep", previous: 300, current: 250 },
      { name: "02 Sep", previous: 200, current: 300 },
      { name: "03 Sep", previous: 400, current: 350 },
      { name: "04 Sep", previous: 350, current: 400 },
      { name: "05 Sep", previous: 420, current: 380 },
      { name: "06 Sep", previous: 310, current: 420 },
      { name: "07 Sep", previous: 280, current: 300 },
    ],
    week: [
      { name: "Week 1", previous: 2200, current: 2100 },
      { name: "Week 2", previous: 2300, current: 2400 },
      { name: "Week 3", previous: 2500, current: 2550 },
      { name: "Week 4", previous: 2700, current: 2600 },
    ],
    month: [
      { name: "Jan", previous: 9000, current: 9400 },
      { name: "Feb", previous: 8500, current: 8700 },
      { name: "Mar", previous: 9100, current: 8900 },
      { name: "Apr", previous: 8800, current: 9100 },
      { name: "May", previous: 9400, current: 9500 },
      { name: "Jun", previous: 9200, current: 9400 },
    ],
  };

  const tableDataSets = {
    day: [
      { date: "01 Sep 2025", reading: "25 kWh", difference: "25 kWh", notes: "hello world" },
      { date: "02 Sep 2025", reading: "28 kWh", difference: "3 kWh", notes: "-" },
      { date: "03 Sep 2025", reading: "30 kWh", difference: "2 kWh", notes: "-" },
    ],
    week: [
      { date: "Week 1", reading: "210 kWh", difference: "10 kWh", notes: "-" },
      { date: "Week 2", reading: "240 kWh", difference: "30 kWh", notes: "-" },
      { date: "Week 3", reading: "255 kWh", difference: "15 kWh", notes: "-" },
      { date: "Week 4", reading: "260 kWh", difference: "5 kWh", notes: "-" },
    ],
    month: [
      { date: "Jan 2025", reading: "9400 kWh", difference: "400 kWh", notes: "-" },
      { date: "Feb 2025", reading: "8700 kWh", difference: "200 kWh", notes: "-" },
      { date: "Mar 2025", reading: "8900 kWh", difference: "300 kWh", notes: "-" },
    ],
  };

  const chartData = dataSets[range];
  const tableData = tableDataSets[range];

  // ====== UI ======
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <HomeSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Meter Data
        </h1>

        {/* Range Selector */}
        <div className="flex gap-4 mb-6">
          {["day", "week", "month"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-5 py-2 rounded-full border transition-all duration-300 ${
                range === r
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-400"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-8">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="previous"
                stroke="#c2410c"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="current" stroke="#a855f7" />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex justify-end text-sm mt-2 space-x-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-orange-600 rounded-full"></span>
              <span>Previous</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              <span>Current</span>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="py-2 px-4 border-b dark:text-white">Date</th>
                <th className="py-2 px-4 border-b dark:text-white">Reading</th>
                <th className="py-2 px-4 border-b dark:text-white">Difference</th>
                <th className="py-2 px-4 border-b dark:text-white">Notes</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 dark:text-white dark:hover:bg-gray-900 transition"
                >
                  <td className="py-2 px-4 border-b dark:text-white">{row.date}</td>
                  <td className="py-2 px-4 border-b dark:text-white">{row.reading}</td>
                  <td className="py-2 px-4 border-b dark:text-white">{row.difference}</td>
                  <td className="py-2 px-4 border-b dark:text-white">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MeterData;
