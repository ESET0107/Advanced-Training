// src/pages/Zone/UserManagement/ZoneUserManagement.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import ZoneSidebar from "../../components/layout/ZoneLayout/ZoneSidebar";
import { MoreVertical, Edit, RefreshCw, UserPlus } from "lucide-react";

// ✅ Sample Data
const sampleUsers = [
  { id: 1, name: "abc", email: "abc@gmail.com", role: "role 1", zone: "Mangalore", status: "Active" },
  { id: 2, name: "def", email: "def@gmail.com", role: "role 1", zone: "Mangalore", status: "Active" },
  { id: 3, name: "ghi", email: "ghi@gmail.com", role: "role 1", zone: "Mangalore", status: "Active" },
  { id: 4, name: "jkl", email: "jkl@gmail.com", role: "role 1", zone: "Mangalore", status: "Active" },
  { id: 5, name: "mno", email: "mno@gmail.com", role: "role 2", zone: "Bajpe", status: "De-Activated" },
  { id: 6, name: "pqr", email: "pqr@gmail.com", role: "role 2", zone: "Bajpe", status: "De-Activated" },
  { id: 7, name: "stu", email: "stu@gmail.com", role: "role 2", zone: "Bajpe", status: "De-Activated" },
  { id: 8, name: "vwx", email: "vwx@gmail.com", role: "role 2", zone: "Bajpe", status: "De-Activated" },
  { id: 9, name: "yz1", email: "yz1@gmail.com", role: "role 3", zone: "Surathkal", status: "Active" },
  { id: 10, name: "yz2", email: "yz2@gmail.com", role: "role 3", zone: "Surathkal", status: "Active" },
  { id: 11, name: "yz3", email: "yz3@gmail.com", role: "role 3", zone: "Surathkal", status: "Active" },
  { id: 12, name: "yz4", email: "yz4@gmail.com", role: "role 3", zone: "Surathkal", status: "Active" },
];

const FIELDS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "zone", label: "Zone" },
  { key: "status", label: "Status" },
];

export default function ZoneUserManagement() {
  const [users, setUsers] = useState(sampleUsers);
  const [searchField, setSearchField] = useState("name");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const [openMenuId, setOpenMenuId] = useState(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteData, setInviteData] = useState({ email: "", role: "", zone: "" });

  const menuRefs = useRef({});

  // Close menus when clicking outside
  useEffect(() => {
    function handleDocClick(e) {
      const anyOpen = Object.keys(menuRefs.current).some((id) => {
        const el = menuRefs.current[id];
        return el && el.contains(e.target);
      });
      if (!anyOpen) setOpenMenuId(null);
    }
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

  const filteredUsers = useMemo(() => {
    if (!query.trim()) return users;
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      const val = (u[searchField] ?? "").toString().toLowerCase();
      return val.includes(q);
    });
  }, [users, searchField, query]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const visibleUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage]);

  // Handlers
  const clearSearch = () => {
    setQuery("");
    setCurrentPage(1);
  };

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (user) => {
    alert(`Edit user ${user.name} (id ${user.id}) — implement navigation to edit form.`);
    setOpenMenuId(null);
  };

  const handleToggleActive = (user) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === "Active" ? "De-Activated" : "Active" }
          : u
      )
    );
    setOpenMenuId(null);
  };

  const handleResetPassword = (user) => {
    alert(`Reset password triggered for ${user.name} (id ${user.id}).`);
    setOpenMenuId(null);
  };

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
    setUsers((prev) => [...prev, newUser]);
    setIsInviteModalOpen(false);
    setInviteData({ email: "", role: "", zone: "" });
  };

  const gotoPage = (p) => {
    const page = Math.max(1, Math.min(totalPages, p));
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <ZoneSidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            User Management
          </h1>
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:shadow-sm"
          >
            <UserPlus size={16} /> Invite user
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border rounded px-2 py-1">
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="bg-white dark:bg-gray-800 outline-none text-gray-700 dark:text-white"
            >
              {FIELDS.map((f) => (
                <option value={f.key} key={f.key}>
                  {f.label}
                </option>
              ))}
            </select>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2" />
            <input
              type="search"
              placeholder={`Search by ${FIELDS.find((f) => f.key === searchField)?.label}`}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent outline-none text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
            />
            {query && (
              <button onClick={clearSearch} className="ml-2 px-2 text-gray-600 dark:text-gray-300">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-3 border-b dark:text-white">ID</th>
                <th className="p-3 border-b dark:text-white">Name</th>
                <th className="p-3 border-b dark:text-white">Email</th>
                <th className="p-3 border-b dark:text-white">Role</th>
                <th className="p-3 border-b dark:text-white">Zone</th>
                <th className="p-3 border-b dark:text-white">Status</th>
                <th className="p-3 border-b dark:text-white">More Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-600 dark:text-gray-300">
                    No users found
                  </td>
                </tr>
              ) : (
                visibleUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-3 border-b text-gray-900 dark:text-white">{u.id}</td>
                    <td className="p-3 border-b text-gray-900 dark:text-white">{u.name}</td>
                    <td className="p-3 border-b text-gray-900 dark:text-white">{u.email}</td>
                    <td className="p-3 border-b text-gray-900 dark:text-white">{u.role}</td>
                    <td className="p-3 border-b text-gray-900 dark:text-white">{u.zone}</td>
                    <td
                      className={`p-3 border-b font-semibold ${
                        u.status === "Active"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-500 dark:text-red-400"
                      }`}
                    >
                      {u.status}
                    </td>
                    <td className="p-3 border-b relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMenu(u.id);
                        }}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {openMenuId === u.id && (
                        <div
                          ref={(el) => (menuRefs.current[u.id] = el)}
                          className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded z-10 w-44 text-sm"
                        >
                          <button
                            onClick={() => handleEdit(u)}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-gray-800 dark:text-white"
                          >
                            <Edit size={14} /> Edit
                          </button>

                          <button
                            onClick={() => handleToggleActive(u)}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-gray-800 dark:text-white"
                          >
                            <RefreshCw size={14} />{" "}
                            {u.status === "Active" ? "De-Activate" : "Activate"}
                          </button>

                          <button
                            onClick={() => handleResetPassword(u)}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-gray-800 dark:text-white"
                          >
                            🔐 Reset password
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => gotoPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border bg-gray-100 dark:bg-gray-700 disabled:opacity-50 dark:text-white"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                if (p > 5 && p < totalPages - 2 && Math.abs(p - currentPage) > 2) return null;
                return (
                  <button
                    key={p}
                    onClick={() => gotoPage(p)}
                    className={`px-3 py-1 border ${
                      p === currentPage
                        ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800"
                        : "bg-white dark:bg-gray-700 dark:text-white"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              {totalPages > 7 && <span className="px-2">... {totalPages}</span>}
            </div>

            <button
              onClick={() => gotoPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border bg-gray-100 dark:bg-gray-700 disabled:opacity-50 dark:text-white"
            >
              Next →
            </button>
          </div>

          <div>
            Showing {(currentPage - 1) * pageSize + 1} -{" "}
            {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length}
          </div>
        </div>
      </div>

      {/* ✅ Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-2 dark:text-white">Invite user</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This is a dialogue for inviting a user.
            </p>

            <form onSubmit={handleInviteSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  required
                  placeholder="user@gmail.com"
                  className="w-full border rounded-lg px-3 py-2 mt-1 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={inviteData.role}
                  onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                  placeholder="role1"
                  className="w-full border rounded-lg px-3 py-2 mt-1 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Zone
                </label>
                <input
                  type="text"
                  name="zone"
                  value={inviteData.zone}
                  onChange={(e) => setInviteData({ ...inviteData, zone: e.target.value })}
                  placeholder="Mangalore"
                  className="w-full border rounded-lg px-3 py-2 mt-1 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
              >
                <UserPlus size={16} /> Invite user
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
