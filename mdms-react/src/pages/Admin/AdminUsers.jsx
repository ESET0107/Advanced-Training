import React, { useEffect, useMemo, useRef, useState } from "react";
import AdminSidebar from "../../components/layout/AdminLayout/AdminSidebar";
import { MoreVertical, Edit, RefreshCw, UserPlus, FileDown } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const sampleUsers = [
  { id: 1, name: "abc", email: "abc@gmail.com", role: "Manager", zone: "Mangalore", status: "Active" },
  { id: 2, name: "def", email: "def@gmail.com", role: "Engineer", zone: "Bajpe", status: "Active" },
  { id: 3, name: "ghi", email: "ghi@gmail.com", role: "Technician", zone: "Mangalore", status: "De-Activated" },
  { id: 4, name: "xyz", email: "xyz@gmail.com", role: "Analyst", zone: "Surathkal", status: "Active" },
  { id: 5, name: "pqr", email: "pqr@gmail.com", role: "Admin", zone: "Mangalore", status: "De-Activated" },
];

const yearlyStats = {
  2023: { Active: 60, DeActivated: 30 },
  2024: { Active: 75, DeActivated: 40 },
  2025: { Active: 90, DeActivated: 50 },
};

const FIELDS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "zone", label: "Zone" },
  { key: "status", label: "Status" },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(sampleUsers);
  const [searchField, setSearchField] = useState("name");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteData, setInviteData] = useState({ email: "", role: "", zone: "" });
  const [openMenuId, setOpenMenuId] = useState(null);
  const [year, setYear] = useState("2025");

  const pageSize = 5;
  const menuRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!Object.values(menuRefs.current).some((el) => el && el.contains(e.target))) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredUsers = useMemo(() => {
    if (!query.trim()) return users;
    const q = query.trim().toLowerCase();
    return users.filter((u) => (u[searchField] ?? "").toString().toLowerCase().includes(q));
  }, [users, searchField, query]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const visibleUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      name: inviteData.email.split("@")[0],
      email: inviteData.email,
      role: inviteData.role,
      zone: inviteData.zone,
      status: "Active",
    };
    setUsers([...users, newUser]);
    setIsInviteModalOpen(false);
    setInviteData({ email: "", role: "", zone: "" });
  };

  const handleToggleStatus = (user) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: u.status === "Active" ? "De-Activated" : "Active" } : u))
    );
  };

  const graphData = [
    { label: "Active", value: yearlyStats[year].Active, fill: "#6366F1" },
    { label: "De-Activated", value: yearlyStats[year].DeActivated, fill: "#EF4444" },
  ];

  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Name,Email,Role,Zone,Status"]
        .concat(users.map((u) => `${u.id},${u.name},${u.email},${u.role},${u.zone},${u.status}`))
        .join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "users.csv";
    link.click();
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">User and Role Management</h1>
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-white hover:shadow-sm"
            >
              <FileDown size={16} /> Export as CSV
            </button>
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <UserPlus size={16} /> Invite user
            </button>
          </div>
        </div>

        {/* Search Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center gap-2 border rounded bg-white dark:bg-gray-800 px-2 py-1">
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="bg-transparent text-gray-700 dark:text-white outline-none"
            >
              {FIELDS.map((f) => (
                <option key={f.key} value={f.key}>
                  {f.label}
                </option>
              ))}
            </select>
            <input
              type="search"
              placeholder={`Search by ${FIELDS.find((f) => f.key === searchField)?.label}`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-gray-500 dark:text-gray-300">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Zone</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-3 text-gray-900 dark:text-white">{u.id}</td>
                  <td className="p-3 text-gray-900 dark:text-white">{u.name}</td>
                  <td className="p-3 text-gray-900 dark:text-white">{u.email}</td>
                  <td className="p-3 text-gray-900 dark:text-white">{u.role}</td>
                  <td className="p-3 text-gray-900 dark:text-white">{u.zone}</td>
                  <td
                    className={`p-3 font-semibold ${
                      u.status === "Active" ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {u.status}
                  </td>
                  <td className="p-3 relative">
                    <button
                      onClick={() => setOpenMenuId((prev) => (prev === u.id ? null : u.id))}
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {openMenuId === u.id && (
                      <div
                        ref={(el) => (menuRefs.current[u.id] = el)}
                        className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded w-36 z-10"
                      >
                        <button
                          onClick={() => handleToggleStatus(u)}
                          className="block w-full text-left px-3 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {u.status === "Active" ? "De-Activate" : "Activate"}
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
        <div className="flex justify-between items-center text-sm mt-4 text-gray-700 dark:text-gray-300">
          <div>
            Showing {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              ← Prev
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            Comparison between Active and De-Activated users per year
          </h2>
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setYear((prev) => (parseInt(prev) - 1).toString())}
              className="px-3 py-1 border rounded dark:text-white"
            >
              ←
            </button>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-3 py-1 border rounded dark:bg-gray-800 dark:text-white"
            >
              {Object.keys(yearlyStats).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <button
              onClick={() => setYear((prev) => (parseInt(prev) + 1).toString())}
              className="px-3 py-1 border rounded dark:text-white"
            >
              →
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={graphData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="label" stroke="#888" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" barSize={60} radius={[30, 30, 0, 0]}>
                  {graphData.map((d, i) => (
                    <cell key={`cell-${i}`} fill={d.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Invite User</h2>
            <form onSubmit={handleInviteSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                value={inviteData.email}
                onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="text"
                placeholder="Role"
                value={inviteData.role}
                onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                placeholder="Zone"
                value={inviteData.zone}
                onChange={(e) => setInviteData({ ...inviteData, zone: e.target.value })}
                className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                <UserPlus size={16} /> Invite User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
