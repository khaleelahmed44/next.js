'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Appointment = {
  _id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  service: string;
  description: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
};

type Patient = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
};

type Stats = {
  totalBookings: number;
  totalUsers: number;
  pending: number;
  confirmed: number;
  completed: number;
  estimatedRevenue: number;
};

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("admin@virtualphysio.ca");
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<"overview" | "appointments" | "patients">("overview");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftService, setDraftService] = useState("");

  const totals = useMemo(() => {
    const source = stats ?? {
      totalBookings: appointments.length,
      totalUsers: patients.length,
      pending: appointments.filter((a) => a.status === "pending").length,
      confirmed: appointments.filter((a) => a.status === "confirmed").length,
      completed: appointments.filter((a) => a.status === "completed").length,
      estimatedRevenue: 0,
    };
    return source;
  }, [appointments, patients, stats]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Login failed");
      }
      setIsAuthenticated(true);
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    }
  };

  useEffect(() => {
    fetch("/api/auth/me").then((res) => {
      if (res.ok) setIsAuthenticated(true);
    });
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchAllData = async () => {
      try {
        const [appointmentsRes, usersRes, statsRes] = await Promise.all([
          fetch("/api/appointments"),
          fetch("/api/users"),
          fetch("/api/dashboard/stats"),
        ]);
        if (!appointmentsRes.ok || !usersRes.ok || !statsRes.ok) {
          throw new Error("Session expired");
        }
        const [appointmentsData, usersData, statsData] = await Promise.all([
          appointmentsRes.json(),
          usersRes.json(),
          statsRes.json(),
        ]);
        setAppointments(appointmentsData);
        setPatients(usersData);
        setStats(statsData);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
    const interval = setInterval(fetchAllData, 12000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setAppointments(prevAppointments =>
          prevAppointments.map(apt => apt._id === id ? { ...apt, status: newStatus as Appointment["status"] } : apt)
        );
      }
    } catch (err) {
      console.error('Error updating appointment:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;

    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAppointments(prevAppointments => prevAppointments.filter(apt => apt._id !== id));
      }
    } catch (err) {
      console.error('Error deleting appointment:', err);
    }
  };

  const handleEditSave = async () => {
    if (!editingId || !draftService.trim()) return;
    try {
      const response = await fetch(`/api/appointments/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: draftService.trim() }),
      });
      if (response.ok) {
        setAppointments((prev) =>
          prev.map((apt) =>
            apt._id === editingId ? { ...apt, service: draftService.trim() } : apt
          )
        );
        setEditingId(null);
      }
    } catch (err) {
      console.error("Error updating service:", err);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
    setAppointments([]);
  };

  const handleDeletePatient = async (id: string) => {
    if (!confirm("Delete this patient profile?")) return;
    try {
      const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (response.ok) {
        setPatients((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-gray-600 mb-8">Use admin email and password to access dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Login
            </button>
          </form>

          <Link href="/" className="block text-center mt-4 text-blue-600 hover:text-blue-800">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-64 min-h-screen border-r border-slate-800 bg-slate-900 p-6 md:block">
          <p className="text-xl font-semibold">Virtual Physio Admin</p>
          <div className="mt-8 space-y-2">
            {["overview", "appointments", "patients"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "overview" | "appointments" | "patients")}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm capitalize ${
                  activeTab === tab ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </aside>
        <main className="w-full p-4 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="space-x-3">
              <Link href="/" className="rounded-lg border border-slate-700 px-4 py-2 text-sm">Home</Link>
              <button onClick={handleLogout} className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold">Logout</button>
            </div>
          </div>
        {isLoading ? (
          <div className="text-center text-slate-400 py-12">Loading dashboard...</div>
        ) : (
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-slate-300 font-semibold">Total Bookings</p>
                <p className="text-3xl font-bold text-blue-400">{totals.totalBookings}</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-slate-300 font-semibold">Patients</p>
                <p className="text-3xl font-bold text-cyan-400">{totals.totalUsers}</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-slate-300 font-semibold">Pending / Confirmed / Completed</p>
                <p className="text-2xl font-bold text-amber-300">{totals.pending} / {totals.confirmed} / {totals.completed}</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-slate-300 font-semibold">Estimated Revenue</p>
                <p className="text-3xl font-bold text-emerald-400">${totals.estimatedRevenue}</p>
              </div>
            </div>

            {activeTab !== "patients" && (
            <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800 border-b border-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Patient</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Contact</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Service</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Date & Time</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {appointments.map(appointment => (
                      <tr key={appointment._id} className="hover:bg-slate-800/40">
                        <td className="px-6 py-4 text-sm">
                          <p className="font-semibold text-slate-100">{appointment.patientName}</p>
                          <p className="text-slate-400">{appointment.description || '-'}</p>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <p>{appointment.patientEmail}</p>
                          <p className="text-slate-400">{appointment.patientPhone}</p>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {editingId === appointment._id ? (
                            <div className="flex gap-2">
                              <input
                                value={draftService}
                                onChange={(e) => setDraftService(e.target.value)}
                                className="rounded bg-slate-800 px-2 py-1 text-sm"
                              />
                              <button onClick={handleEditSave} className="rounded bg-blue-600 px-2 py-1 text-xs">Save</button>
                            </div>
                          ) : (
                            <span className="text-slate-100">{appointment.service}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <p>{appointment.appointmentDate}</p>
                          <p className="text-slate-400">{appointment.appointmentTime}</p>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <select
                            value={appointment.status}
                            onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer ${
                              appointment.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                              appointment.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                              appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-rose-100 text-rose-800'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button onClick={() => { setEditingId(appointment._id); setDraftService(appointment.service); }} className="text-blue-400 mr-3 font-semibold">Edit</button>
                          <button onClick={() => handleDelete(appointment._id)} className="text-red-400 hover:text-red-300 font-semibold">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {appointments.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                          No appointments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            )}
            {activeTab === "patients" && (
              <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {patients.map((patient) => (
                      <tr key={patient._id}>
                        <td className="px-6 py-3">{patient.name}</td>
                        <td className="px-6 py-3">{patient.email}</td>
                        <td className="px-6 py-3">{patient.phone || "-"}</td>
                        <td className="px-6 py-3">
                          <button
                            onClick={() => handleDeletePatient(patient._id)}
                            className="text-rose-400 hover:text-rose-300 font-semibold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        </main>
      </div>
    </div>
  );
}
