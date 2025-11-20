// src/pages/Zone/ZoneReportsAnalytics.jsx
import React, { useState, useContext, useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import ZoneSidebar from "../../components/layout/ZoneLayout/ZoneSidebar";
import { ThemeContext } from "../../context/ThemeContext";

const yearlyLineData = {
  2023: [
    { name: "Jan", value: 300 },
    { name: "Feb", value: 200 },
    { name: "Mar", value: 280 },
    { name: "Apr", value: 360 },
    { name: "May", value: 420 },
    { name: "Jun", value: 400 },
  ],
  2024: [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 250 },
    { name: "Mar", value: 320 },
    { name: "Apr", value: 410 },
    { name: "May", value: 370 },
    { name: "Jun", value: 450 },
  ],
  2025: [
    { name: "Jan", value: 480 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 360 },
    { name: "Apr", value: 440 },
    { name: "May", value: 390 },
    { name: "Jun", value: 470 },
  ],
};

const barDataByYear = {
  2023: [
    { zone: "Nongpoh", consumption: 25 },
    { zone: "Boko", consumption: 32 },
    { zone: "Pynursla", consumption: 45 },
    { zone: "Tura", consumption: 30 },
    { zone: "Nongstoin", consumption: 38 },
  ],
  2024: [
    { zone: "Nongpoh", consumption: 35 },
    { zone: "Boko", consumption: 20 },
    { zone: "Pynursla", consumption: 42 },
    { zone: "Tura", consumption: 38 },
    { zone: "Nongstoin", consumption: 47 },
  ],
  2025: [
    { zone: "Nongpoh", consumption: 40 },
    { zone: "Boko", consumption: 30 },
    { zone: "Pynursla", consumption: 48 },
    { zone: "Tura", consumption: 42 },
    { zone: "Nongstoin", consumption: 50 },
  ],
};

const allReports = Array.from({ length: 47 }, (_, i) => ({
  id: 100 + i,
  date: `2025-10-${(i % 30) + 1}`,
  meter: `Meter-${String.fromCharCode(65 + (i % 26))}`,
  consumption: `${150 + (i % 60)}kWh`,
  status: i % 3 === 0 ? "Active" : "Inactive",
}));

const ZoneReportsAnalytics = () => {
  const { theme } = useContext(ThemeContext);
  const [year, setYear] = useState("2025");
  const [searchZone, setSearchZone] = useState("");
  const [searchReport, setSearchReport] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Filter reports by search
  const filteredReports = useMemo(() => {
    return allReports.filter((r) =>
      r.meter.toLowerCase().includes(searchReport.toLowerCase())
    );
  }, [searchReport]);

  // Filter bar chart data by zone
  const filteredBarData = useMemo(() => {
    return barDataByYear[year].filter((item) =>
      item.zone.toLowerCase().includes(searchZone.toLowerCase())
    );
  }, [searchZone, year]);

  // Pagination logic
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const changePage = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ZoneSidebar />

      <div className="flex-1 p-6 space-y-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Reports and Analytics</h1>

        {/* Year Selector */}
        <div className="flex items-center gap-4 mb-4">
          <label className="font-medium">Select Year:</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-3 py-1 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>

        {/* Line Chart */}
        <div
          className={`p-6 rounded-xl shadow-md ${
            theme === "dark" ? "bg-gray-700" : "bg-white"
          }`}
        >
          <h2 className="text-lg font-medium mb-4">
            Trend of energy usage over time
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={yearlyLineData[year]}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme === "dark" ? "#555" : "#ddd"}
              />
              <XAxis
                dataKey="name"
                stroke={theme === "dark" ? "#fff" : "#000"}
              />
              <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart Section */}
        <div
          className={`p-6 rounded-xl shadow-md ${
            theme === "dark" ? "bg-gray-700" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Compare zone consumption</h2>
            <input
              type="text"
              placeholder="Search Zone..."
              value={searchZone}
              onChange={(e) => setSearchZone(e.target.value)}
              className="px-3 py-1 border rounded-lg text-sm bg-gray-100 dark:bg-gray-800 dark:border-gray-600"
            />
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={filteredBarData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme === "dark" ? "#555" : "#ddd"}
              />
              <XAxis
                dataKey="zone"
                stroke={theme === "dark" ? "#fff" : "#000"}
              />
              <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
              <Tooltip />
              <Bar dataKey="consumption" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Reports Table */}
        <div
          className={`p-6 rounded-xl shadow-md ${
            theme === "dark" ? "bg-gray-700" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Reports</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by Meter"
                value={searchReport}
                onChange={(e) => {
                  setSearchReport(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-1 border rounded-lg text-sm bg-gray-100 dark:bg-gray-800 dark:border-gray-600"
              />
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                Export CSV
              </button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
                Export PDF
              </button>
            </div>
          </div>

          <table className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-600">
              <tr>
                <th className="p-2 text-left">Meter ID</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Meter Name</th>
                <th className="p-2 text-left">Consumption</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReports.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="p-2">{r.id}</td>
                  <td className="p-2">{r.date}</td>
                  <td className="p-2">{r.meter}</td>
                  <td className="p-2">{r.consumption}</td>
                  <td className="p-2">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <button
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneReportsAnalytics;
