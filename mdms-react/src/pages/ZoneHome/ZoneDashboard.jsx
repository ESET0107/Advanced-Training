import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ZoneSidebar from "../../components/layout/ZoneLayout/ZoneSidebar";

// Weekly Data
const weekData = [
  { name: "Mon", usage: 320 },
  { name: "Tue", usage: 360 },
  { name: "Wed", usage: 180 },
  { name: "Thu", usage: 220 },
  { name: "Fri", usage: 340 },
  { name: "Sat", usage: 380 },
  { name: "Sun", usage: 270 },
];

// Monthly Data
const monthData = [
  { name: "Week 1", usage: 2200 },
  { name: "Week 2", usage: 3100 },
  { name: "Week 3", usage: 2800 },
  { name: "Week 4", usage: 3500 },
];

const ZoneDashboard = () => {
  const [timeframe, setTimeframe] = useState("Week");

  const currentData = timeframe === "Week" ? weekData : monthData;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <ZoneSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Zone Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow text-center">
            <div className="text-2xl mb-2">📟</div>
            <div className="text-lg font-semibold">256</div>
            <div className="text-gray-500 text-sm">Active meters</div>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <div className="text-2xl mb-2">📈</div>
            <div className="text-lg font-semibold">55%</div>
            <div className="text-gray-500 text-sm">Avg usage</div>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <div className="text-2xl mb-2">⚠️</div>
            <div className="text-lg font-semibold">26</div>
            <div className="text-gray-500 text-sm">Pending alerts</div>
          </div>
        </div>

        {/* Analytics Chart */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Analytics Chart</h3>
            <div className="flex border rounded overflow-hidden text-sm">
              <button
                className={`px-3 py-1 ${
                  timeframe === "Week" ? "bg-purple-200" : "bg-white"
                }`}
                onClick={() => setTimeframe("Week")}
              >
                Week
              </button>
              <button
                className={`px-3 py-1 ${
                  timeframe === "Month" ? "bg-purple-200" : "bg-white"
                }`}
                onClick={() => setTimeframe("Month")}
              >
                Month
              </button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#a78bfa"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded shadow hover:bg-purple-200">
            + Add meter
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded shadow hover:bg-gray-200">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZoneDashboard;
