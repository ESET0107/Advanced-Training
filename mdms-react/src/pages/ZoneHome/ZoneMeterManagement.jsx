// src/pages/Zone/MeterManagement/ZoneMeterManagement.jsx
import React, { useState, useMemo, useEffect, useRef } from "react";
import ZoneSidebar from "../../components/layout/ZoneLayout/ZoneSidebar";
import { MoreVertical, Eye, Edit, Power } from "lucide-react";

const sampleMeters = [
  { id: 123, zone: "Mangalore", owner: "abc", status: "Active", lastReading: "2025-10-07T07:15:13Z" },
  { id: 124, zone: "Bajpe", owner: "xyz", status: "De-Activated", lastReading: "2025-10-07T07:15:13Z" },
  { id: 125, zone: "Surathkal", owner: "pqr", status: "Active", lastReading: "2025-10-07T07:15:13Z" },
  { id: 126, zone: "Bajpe", owner: "xyz", status: "De-Activated", lastReading: "2025-10-07T07:15:13Z" },
  { id: 127, zone: "Mangalore", owner: "mno", status: "Active", lastReading: "2025-10-07T07:15:13Z" },
  { id: 128, zone: "Bajpe", owner: "rst", status: "De-Activated", lastReading: "2025-10-07T07:15:13Z" },
  { id: 129, zone: "Surathkal", owner: "uvw", status: "Active", lastReading: "2025-10-07T07:15:13Z" },
  { id: 130, zone: "Bajpe", owner: "xyz", status: "De-Activated", lastReading: "2025-10-07T07:15:13Z" },
  { id: 131, zone: "Mangalore", owner: "abc", status: "Active", lastReading: "2025-10-07T07:15:13Z" },
  { id: 132, zone: "Surathkal", owner: "pqr", status: "De-Activated", lastReading: "2025-10-07T07:15:13Z" },
];

const ZoneMeterManagement = () => {
  const [meters, setMeters] = useState(sampleMeters);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const menuRefs = useRef({});

  // Pagination calculations
  const totalPages = Math.ceil(meters.length / pageSize);
  const paginatedMeters = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return meters.slice(start, start + pageSize);
  }, [meters, currentPage]);

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const isClickInside = Object.values(menuRefs.current).some(
        (ref) => ref && ref.contains(e.target)
      );
      if (!isClickInside) setOpenMenuId(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handlers
  const handleView = (meter) => {
    alert(`Viewing details of meter ID: ${meter.id}`);
    setOpenMenuId(null);
  };

  const handleEdit = (meter) => {
    alert(`Editing meter ID: ${meter.id}`);
    setOpenMenuId(null);
  };

  const handleToggleStatus = (meter) => {
    setMeters((prev) =>
      prev.map((m) =>
        m.id === meter.id
          ? {
              ...m,
              status: m.status === "Active" ? "De-Activated" : "Active",
            }
          : m
      )
    );
    setOpenMenuId(null);
  };

  const handleMenuToggle = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const gotoPage = (page) => {
    const newPage = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(newPage);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <ZoneSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Meter Management
        </h1>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-3 border-b dark:text-white">Meter ID</th>
                <th className="p-3 border-b dark:text-white">Zone</th>
                <th className="p-3 border-b dark:text-white">Owner</th>
                <th className="p-3 border-b dark:text-white">Status</th>
                <th className="p-3 border-b dark:text-white">Last Reading</th>
                <th className="p-3 border-b dark:text-white">More Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMeters.map((meter) => (
                <tr
                  key={meter.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-3 border-b text-gray-900 dark:text-white">
                    {meter.id}
                  </td>
                  <td className="p-3 border-b text-gray-900 dark:text-white">
                    {meter.zone}
                  </td>
                  <td className="p-3 border-b text-gray-900 dark:text-white">
                    {meter.owner}
                  </td>
                  <td
                    className={`p-3 border-b font-semibold ${
                      meter.status === "Active"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {meter.status}
                  </td>
                  <td className="p-3 border-b text-gray-900 dark:text-white">
                    {new Date(meter.lastReading).toLocaleString()}
                  </td>
                  <td className="p-3 border-b relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuToggle(meter.id);
                      }}
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {openMenuId === meter.id && (
                      <div
                        ref={(el) => (menuRefs.current[meter.id] = el)}
                        className="absolute right-8 top-8 bg-white dark:bg-gray-800 shadow-lg rounded z-10 w-36 text-sm"
                      >
                        <button
                          onClick={() => handleView(meter)}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-gray-800 dark:text-white"
                        >
                          <Eye size={14} /> View
                        </button>
                        <button
                          onClick={() => handleEdit(meter)}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-gray-800 dark:text-white"
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleToggleStatus(meter)}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-gray-800 dark:text-white"
                        >
                          <Power size={14} />{" "}
                          {meter.status === "Active"
                            ? "De-Activate"
                            : "Activate"}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => gotoPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded bg-gray-100 dark:bg-gray-700 disabled:opacity-50 dark:text-white"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => gotoPage(i + 1)}
                  className={`px-3 py-1 border ${
                    currentPage === i + 1
                      ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800"
                      : "bg-white dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => gotoPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded bg-gray-100 dark:bg-gray-700 disabled:opacity-50 dark:text-white"
            >
              Next →
            </button>
          </div>

          <div>
            Showing {(currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, meters.length)} of{" "}
            {meters.length}
          </div>
        </div>

        {/* Bulk Operations */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            Bulk Operations
          </h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => alert("Import CSV triggered")}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded shadow hover:bg-purple-200 dark:bg-purple-900 dark:text-white dark:hover:bg-purple-800"
            >
              ⬇️ Import CSV
            </button>
            <button
              onClick={() => alert("Export CSV triggered")}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded shadow hover:bg-purple-200 dark:bg-purple-900 dark:text-white dark:hover:bg-purple-800"
            >
              ⬆️ Export CSV
            </button>
            <button
              onClick={() =>
                setMeters((prev) =>
                  prev.map((m) => ({ ...m, status: "De-Activated" }))
                )
              }
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded shadow hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              ⛔ De-Activate All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneMeterManagement;
