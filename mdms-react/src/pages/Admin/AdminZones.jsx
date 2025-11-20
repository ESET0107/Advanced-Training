import React, { useState } from "react";
import AdminSidebar from "../../components/layout/AdminLayout/AdminSidebar";
import { MoreVertical, Plus, Trash2, Edit, Eye, X } from "lucide-react";

const AdminZones = () => {
const [zones, setZones] = useState([
{ id: 123, name: "Mangalore", admin: "abc", meters: 5, status: "Active" },
{ id: 123, name: "Mangalore", admin: "abc", meters: 6, status: "Active" },
{ id: 123, name: "Mangalore", admin: "abc", meters: 8, status: "Active" },
{ id: 124, name: "Baije", admin: "xyz", meters: 12, status: "Active" },
{ id: 124, name: "Baije", admin: "xyz", meters: 23, status: "De-Activated" },
{ id: 124, name: "Baije", admin: "xyz", meters: 34, status: "De-Activated" },
]);

const [showDialog, setShowDialog] = useState(false);
const [showActions, setShowActions] = useState(null);
const [formData, setFormData] = useState({
name: "",
admin: "",
location: "",
description: "",
});

const toggleDialog = () => setShowDialog(!showDialog);
const toggleActions = (id) =>
setShowActions((prev) => (prev === id ? null : id));

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleAddZone = () => {
if (!formData.name || !formData.admin) return;
setZones((prev) => [
...prev,
{
id: Math.floor(Math.random() * 1000),
name: formData.name,
admin: formData.admin,
meters: 0,
status: "Active",
},
]);
setFormData({ name: "", admin: "", location: "", description: "" });
setShowDialog(false);
};

return (
<div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
{/* Sidebar */}
<AdminSidebar />

  <div className="flex-1 p-4 md:p-6">
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-6">
      <h2 className="text-2xl font-semibold">Zone Management</h2>
      <button
        onClick={toggleDialog}
        className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm md:text-base"
      >
        <Plus size={18} />
        Add Zone
      </button>
    </div>

    {/* Table */}
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full text-sm md:text-base">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {["Zone ID", "Zone Name", "Admin Assigned", "Total Meters", "Status", "More Actions"].map(
              (header) => (
                <th
                  key={header}
                  className="px-3 md:px-4 py-2 font-semibold text-gray-700 dark:text-white text-left whitespace-nowrap"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => (
            <tr
              key={zone.id}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td className="px-3 md:px-4 py-2">{zone.id}</td>
              <td className="px-3 md:px-4 py-2">{zone.name}</td>
              <td className="px-3 md:px-4 py-2">{zone.admin}</td>
              <td className="px-3 md:px-4 py-2">{zone.meters}</td>
              <td
                className={`px-3 md:px-4 py-2 font-medium ${
                  zone.status === "Active"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {zone.status}
              </td>
              <td className="px-3 md:px-4 py-2 relative">
                <button
                  onClick={() => toggleActions(zone.id)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <MoreVertical size={18} />
                </button>

                {showActions === zone.id && (
                  <div className="absolute right-6 mt-1 w-32 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg z-10">
                    <button className="flex items-center w-full gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Eye size={14} /> View
                    </button>
                    <button className="flex items-center w-full gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Edit size={14} /> Edit
                    </button>
                    <button className="flex items-center w-full gap-2 px-3 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Trash2 size={14} /> Delete
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
    <div className="flex flex-wrap justify-center items-center gap-2 mt-4 text-gray-600 dark:text-gray-300 text-sm">
      <button className="px-2 py-1 hover:underline">← Previous</button>
      <button className="font-semibold bg-black text-white px-3 py-1 rounded-md">
        1
      </button>
      <button className="px-2 py-1 hover:underline">2</button>
      <span>...</span>
      <button className="px-2 py-1 hover:underline">68 →</button>
      <button className="px-2 py-1 hover:underline">Next →</button>
    </div>
  </div>

  {/* Add Zone Slide Panel */}
  {showDialog && (
    <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white dark:bg-gray-800 shadow-2xl p-6 overflow-y-auto z-50 transition-all">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Add Zone</h3>
        <button onClick={toggleDialog}>
          <X size={20} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        This is a dialogue for adding zone
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Zone Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Mangalore"
            className="w-full border px-3 py-2 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Admin</label>
          <select
            name="admin"
            value={formData.admin}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          >
            <option value="">Select admin</option>
            <option value="abc">abc</option>
            <option value="xyz">xyz</option>
            <option value="axys">axys</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Address or pincode"
            className="w-full border px-3 py-2 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description here"
            className="w-full border px-3 py-2 rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          ></textarea>
        </div>
      </div>

      <button
        onClick={handleAddZone}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
      >
        <Plus size={18} /> Add Zone
      </button>

      <button
        onClick={toggleDialog}
        className="mt-3 w-full text-gray-500 dark:text-gray-300 hover:underline"
      >
        Cancel
      </button>
    </div>
  )}
</div>


);
};

export default AdminZones;