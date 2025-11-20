import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { AlertTriangle, Activity, BarChart2, Layers } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "leaflet/dist/leaflet.css";
import AdminSidebar from "../../components/layout/AdminLayout/AdminSidebar";

const zones = [
{ id: 1, name: "Mangalore Zone", lat: 12.91, lng: 74.85, alerts: 6, meters: 12, consumption: 26 },
{ id: 2, name: "Padil Zone", lat: 12.95, lng: 74.86, alerts: 4, meters: 10, consumption: 22 },
{ id: 3, name: "Udupi Zone", lat: 13.33, lng: 74.74, alerts: 8, meters: 15, consumption: 31 },
{ id: 4, name: "Surathkal Zone", lat: 12.98, lng: 74.81, alerts: 5, meters: 11, consumption: 24 },
];

const alertsData = [
{ id: 1, title: "Alert 1", desc: "Voltage fluctuation in Mangalore Zone" },
{ id: 2, title: "Alert 2", desc: "Abnormal frequency detected in Padil Zone" },
{ id: 3, title: "Alert 3", desc: "Power outage in Udupi Zone" },
{ id: 4, title: "Alert 4", desc: "High consumption in Surathkal Zone" },
];

const AdminDashboard = () => {
const [selectedAlert, setSelectedAlert] = useState(alertsData[1]);

return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <AdminSidebar/>
<div className="flex flex-col flex-1 p-6 dark:bg-gray-900 dark:text-white">
<h2 className="text-2xl font-semibold mb-6">Enterprise Dashboard</h2>

  {/* Stats Section */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <div className="p-4 border rounded-lg flex flex-col items-center justify-center dark:border-gray-700 shadow-sm hover:shadow-md transition">
      <Layers className="text-blue-500 mb-2" size={20} />
      <h3 className="text-lg font-semibold">256</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">Total Zones</p>
    </div>
    <div className="p-4 border rounded-lg flex flex-col items-center justify-center dark:border-gray-700 shadow-sm hover:shadow-md transition">
      <BarChart2 className="text-green-500 mb-2" size={20} />
      <h3 className="text-lg font-semibold">55</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">Total Meters</p>
    </div>
    <div className="p-4 border rounded-lg flex flex-col items-center justify-center dark:border-gray-700 shadow-sm hover:shadow-md transition">
      <AlertTriangle className="text-red-500 mb-2" size={20} />
      <h3 className="text-lg font-semibold">26</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">Critical Alerts</p>
    </div>
    <div className="p-4 border rounded-lg flex flex-col items-center justify-center dark:border-gray-700 shadow-sm hover:shadow-md transition">
      <Activity className="text-yellow-500 mb-2" size={20} />
      <h3 className="text-lg font-semibold">26%</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">Avg. Consumption per Zone</p>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Map Section */}
    <div className="rounded-lg overflow-hidden shadow-md bg-black dark:bg-gray-800">
      <MapContainer
        center={[12.91, 74.85]}
        zoom={11}
        style={{ height: "350px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="© OpenStreetMap contributors"
        />
        {zones.map((zone) => (
          <Marker key={zone.id} position={[zone.lat, zone.lng]}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{zone.name}</p>
                <p>⚡ {zone.meters} Meters</p>
                <p>🚨 {zone.alerts} Alerts</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>

    {/* Alerts & Chart Section */}
    <div className="space-y-6">
      {/* Recent Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="font-semibold mb-3 text-lg">Recent Alerts</h3>
        <ul className="space-y-2">
          {alertsData.map((alert) => (
            <li
              key={alert.id}
              className={`p-2 border rounded-md cursor-pointer ${
                selectedAlert.id === alert.id
                  ? "bg-red-50 dark:bg-gray-700 border-red-500"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => setSelectedAlert(alert)}
            >
              <p className="font-medium">{alert.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {alert.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Selected Alert Details */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-500">
          <AlertTriangle size={18} /> {selectedAlert.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {selectedAlert.desc}
        </p>
      </div>
    </div>
  </div>

  {/* Zone-Wise Chart */}
  <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="font-semibold mb-4 text-lg">Zone-wise Data</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={zones}>
        <CartesianGrid strokeDasharray="3 3" stroke="#555" />
        <XAxis dataKey="name" tick={{ fill: "#888" }} />
        <YAxis tick={{ fill: "#888" }} />
        <Tooltip />
        <Bar dataKey="alerts" fill="#ef4444" name="Critical Alerts" />
        <Bar dataKey="meters" fill="#3b82f6" name="Meters" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
</div>

);
};

export default AdminDashboard;