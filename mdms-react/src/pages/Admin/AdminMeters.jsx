import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { MoreVertical, Search } from "lucide-react";
import AdminSidebar from "../../components/layout/AdminLayout/AdminSidebar";

/**
 * AdminMeterManagement.jsx
 * - Functional search + zone/owner dropdown filters
 * - Pagination
 * - Year dropdown controls chart for "Energy Trend Over Years"
 * - Dark-mode ready (tailwind classes using dark:)
 */

/* ---------- Dummy data ---------- */
const zonesList = ["Mangalore", "Udupi", "Bantwal", "Surathkal", "Kotekar", "Pumpwell", "Padil"];
const ownersList = ["abc", "xyz", "pqr", "owner1", "owner2"];
const statusList = ["Active", "De-Activated", "Faulty"];
const years = ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"];

/* create dummy meters */
const dummyMeters = Array.from({ length: 38 }).map((_, i) => {
  const zone = zonesList[i % zonesList.length];
  const owner = ownersList[i % ownersList.length];
  const status = i % 11 === 0 ? "De-Activated" : i % 7 === 0 ? "Faulty" : "Active";
  return {
    id: 2000 + i,
    zone,
    owner,
    status,
    lastReading: new Date(2025, (i % 12), (i % 28) + 1).toISOString(),
  };
});

/* yearly trends: map year -> array of { location, value } */
const yearlyTrends = {
  2018: zonesList.map((z, idx) => ({ location: z, value: 200 + idx * 10 + 20 })),
  2019: zonesList.map((z, idx) => ({ location: z, value: 220 + idx * 12 + 10 })),
  2020: zonesList.map((z, idx) => ({ location: z, value: 190 + idx * 8 + 30 })),
  2021: zonesList.map((z, idx) => ({ location: z, value: 240 + idx * 15 })),
  2022: zonesList.map((z, idx) => ({ location: z, value: 300 + idx * 18 })),
  2023: zonesList.map((z, idx) => ({ location: z, value: 350 + idx * 20 })),
  2024: zonesList.map((z, idx) => ({ location: z, value: 330 + idx * 22 })),
  2025: zonesList.map((z, idx) => ({ location: z, value: 370 + idx * 25 })),
};

const pageSize = 8;

const AdminMeters = () => {
  // filters / search state
  const [searchText, setSearchText] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [page, setPage] = useState(1);
  const [openActions, setOpenActions] = useState(null);

  // chart year selection
  const [chartYear, setChartYear] = useState("2025");

  // derived filtered data (live filtering)
  const filtered = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return dummyMeters.filter((m) => {
      if (selectedZone && m.zone !== selectedZone) return false;
      if (selectedOwner && m.owner !== selectedOwner) return false;
      if (selectedStatus && m.status !== selectedStatus) return false;
      if (!q) return true;
      return (
        String(m.id).includes(q) ||
        m.zone.toLowerCase().includes(q) ||
        m.owner.toLowerCase().includes(q)
      );
    });
  }, [searchText, selectedZone, selectedOwner, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const handleClearFilters = () => {
    setSearchText("");
    setSelectedZone("");
    setSelectedOwner("");
    setSelectedStatus("");
    setPage(1);
  };

  // helpers
  const formatDate = (iso) => new Date(iso).toLocaleString();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-6">
        {/* header + search bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold dark:text-white">Global Meter Management</h1>

          {/* Search + dropdowns (dropdowns beside search bar; responsive stack on small) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow w-full sm:w-[420px]">
              <Search className="text-gray-400" />
              <input
                type="search"
                placeholder="Search by meter id, zone, or owner..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent outline-none flex-1 text-sm dark:text-white"
              />
              {searchText && (
                <button
                  onClick={() => {
                    setSearchText("");
                    setPage(1);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-300"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={selectedZone}
              onChange={(e) => {
                setSelectedZone(e.target.value);
                setPage(1);
              }}
              className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow text-sm dark:text-white w-full sm:w-44"
            >
              <option value="">All Zones</option>
              {zonesList.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>

            <select
              value={selectedOwner}
              onChange={(e) => {
                setSelectedOwner(e.target.value);
                setPage(1);
              }}
              className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow text-sm dark:text-white w-full sm:w-44"
            >
              <option value="">All Owners</option>
              {ownersList.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>

            {/* Status filter */}
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setPage(1);
              }}
              className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow text-sm dark:text-white w-full sm:w-44"
            >
              <option value="">All Status</option>
              {statusList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button
              onClick={handleClearFilters}
              className="hidden sm:inline-block px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-sm dark:text-white"
            >
              Clear
            </button>
          </div>
        </div>

        {/* table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3">Meter ID</th>
                <th className="px-4 py-3">Zone</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Reading</th>
                <th className="px-4 py-3 text-center">More Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">{row.zone}</td>
                  <td className="px-4 py-3">{row.owner}</td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      row.status === "Active" ? "text-green-600" : row.status === "Faulty" ? "text-yellow-500" : "text-red-500"
                    }`}
                  >
                    {row.status}
                  </td>
                  <td className="px-4 py-3">{formatDate(row.lastReading)}</td>
                  <td className="px-4 py-3 text-center relative">
                    <button
                      onClick={() => setOpenActions(openActions === row.id ? null : row.id)}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <MoreVertical />
                    </button>

                    {openActions === row.id && (
                      <div className="absolute right-6 mt-1 w-36 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg z-30">
                        <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">View</button>
                        <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Edit</button>
                        <button className="w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {pageData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 text-gray-600 dark:text-gray-300">
          <div className="text-sm">
            Showing {filtered.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              &lt; Prev
            </button>

            <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded">
              {page} / {totalPages}
            </div>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Next &gt;
            </button>
          </div>
        </div>

        {/* Chart area */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Zone-wise Area Chart (static example) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow h-72">
            <p className="text-sm mb-2 dark:text-gray-300">Zone-wise trend (sample)</p>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={yearlyTrends[chartYear]}>
                <defs>
                  <linearGradient id="zoneGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="location" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#7c3aed" fill="url(#zoneGrad2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Year selector + Trend for that year */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow h-72 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm dark:text-gray-300">Energy Trend over Locations — Year</p>
              <select
                value={chartYear}
                onChange={(e) => setChartYear(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 rounded px-3 py-1 text-sm dark:text-white"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyTrends[chartYear]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="location" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminMeters;
