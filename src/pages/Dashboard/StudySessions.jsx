// pages/Dashboard/StudySessions.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const StudySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    duration: "",
    location: "",
    productivity: "",
    activity: "",
    notes: "",
  });

  // Fetch study logs
  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.STUDY.GET_LOGS);
      setSessions(res.data || []);
    } catch (err) {
      console.error("Error fetching study sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Add new log
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(API_PATHS.STUDY.ADD_LOG, form);
      setForm({ duration: "", location: "", productivity: "", activity: "", notes: "" });
      fetchSessions();
    } catch (err) {
      console.error("Error adding log:", err);
    }
  };

  // Delete log
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.STUDY.DELETE_LOG(id));
      fetchSessions();
    } catch (err) {
      console.error("Error deleting log:", err);
    }
  };

  // Download logs
  const handleDownload = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.STUDY.DOWNLOAD_LOGS, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "StudyLogs.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading logs:", err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <DashboardLayout activeMenu="Study Sessions">
      <div className="p-6 space-y-6">

        {/* Add Log Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Study Log</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Duration (hours)</label>
              <input
                type="number"
                min="0"
                placeholder="Duration"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Location</label>
              <input
                type="text"
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Productivity</label>
              <select
                value={form.productivity}
                onChange={(e) => setForm({ ...form, productivity: e.target.value })}
                className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select</option>
                <option value="1">1 - Very Low</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4 - Low</option>
                <option value="5">5 - Medium</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8 - High</option>
                <option value="9">9</option>
                <option value="10">10 - Very High</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Activity</label>
              <input
                type="text"
                placeholder="Activity"
                value={form.activity}
                onChange={(e) => setForm({ ...form, activity: e.target.value })}
                className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex flex-col sm:col-span-2">
              <label className="mb-1 font-medium text-gray-700">Notes</label>
              <textarea
                rows={3}
                placeholder="Notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="sm:col-span-2 bg-blue-400 text-white p-3 rounded hover:bg-blue-700 transition"
            >
              Add Log
            </button>
          </form>
        </div>

        {/* Download Button */}
        <div className="flex justify-end">
          <button onClick={handleDownload} className="bg-fuchsia-900 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Download Logs
          </button>
        </div>

        {/* Sessions List */}
        {!sessions.length ? (
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Last 7 Days</h2>
            <p className="text-gray-500">No study sessions recorded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sessions.map((log) => (
              <div key={log._id} className="p-4 bg-pink-200 border border-pink-300 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-150">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{log.location}</span>
                  <span className="text-xs text-gray-600">
                    {new Date(log.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-blue-800 italic mb-2">{log.notes}</p>
                <div className="flex gap-2 flex-wrap mb-2">
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">{log.activity || "General"}</span>
                  <span className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">{log.duration} hour(s)</span>
                </div>
                <div>
                  {log.productivity >= 8 && <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">High Productivity</span>}
                  {log.productivity <= 4 && <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">Low Productivity</span>}
                  {log.productivity > 4 && log.productivity < 8 && <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">Medium Productivity</span>}
                </div>
                <button
                  onClick={() => handleDelete(log._id)}
                  className="mt-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudySessions;
