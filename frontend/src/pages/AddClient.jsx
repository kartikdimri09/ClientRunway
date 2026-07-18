import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";

const STATUS_OPTIONS = ["Just Started", "In Progress", "Stuck", "Live"];

const DEFAULT_CHECKLIST = [
  { id: 1, label: "Docs Collected", done: false },
  { id: 2, label: "Training Completed", done: false },
  { id: 3, label: "Integration Setup", done: false },
  { id: 4, label: "Billing Setup", done: false },
  { id: 5, label: "Go-Live Approved", done: false },
];

const INITIAL_FORM = {
  name: "",
  company: "",
  contactEmail: "",
  contactPhone: "",
  status: "Just Started",
};

export default function AddClient() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Client name is required.";
    }
    if (!form.company.trim()) {
      newErrors.company = "Company is required.";
    }
    if (!form.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required.";
    }
    if (!form.contactPhone.trim()) {
      newErrors.contactPhone = "Contact phone is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!validate()) return;

  try {
    const response = await api.post("/clients", {
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.contactEmail.trim(),
      phone: form.contactPhone.trim(),
      status: form.status,
      notes: "",
    });

    toast.success(response.data.message);

    navigate("/clients");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add client");
  }
};

  const inputClassName = (field) =>
    `w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
        : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
    }`;

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        to="/clients"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to Clients
      </Link>

      {/* Header */}
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          New Client
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Add New Client
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
          Create a new onboarding account and start tracking their progress from day one.
        </p>
      </div>

      {/* Form card */}
      <div className="mx-auto max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Client Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Fill in the basic information to get started
            </p>
          </div>

          <div className="space-y-5 px-6 py-6">
            {/* Client Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Client Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className={inputClassName("name")}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. Acme Pvt Ltd"
                className={inputClassName("company")}
              />
              {errors.company && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.company}
                </p>
              )}
            </div>

            {/* Contact Email */}
            <div>
              <label
                htmlFor="contactEmail"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                placeholder="e.g. rahul@acme.com"
                className={inputClassName("contactEmail")}
              />
              {errors.contactEmail && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.contactEmail}
                </p>
              )}
            </div>

            {/* Contact Phone */}
            <div>
              <label
                htmlFor="contactPhone"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Contact Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contactPhone"
                name="contactPhone"
                value={form.contactPhone}
                onChange={handleChange}
                placeholder="e.g. +91 90000 00001"
                className={inputClassName("contactPhone")}
              />
              {errors.contactPhone && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.contactPhone}
                </p>
              )}
            </div>

            {/* Initial Status */}
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Initial Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-500">
                New clients typically start as &quot;Just Started&quot;
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4">
            <Link
              to="/clients"
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow-md"
            >
              <Plus size={16} />
              Save Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}