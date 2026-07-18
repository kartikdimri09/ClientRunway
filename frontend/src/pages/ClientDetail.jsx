import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import api from "../services/api";
import { getStatusBadge, getInitials } from "../utils/ClientHelpers";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  "Just Started",
  "In Progress",
  "Stuck",
  "Live",
];

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [client, setClient] = useState(null);

  useEffect(() => {
    fetchClient();
  }, [id]);

  const fetchClient = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/clients/${id}`);

      setClient(response.data.client);
      setNotFound(false);
    } catch (error) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (e) => {
    setClient((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };
  const handleChecklistToggle = (index) => {
    const updatedChecklist = [...client.checklist];

    updatedChecklist[index].done = !updatedChecklist[index].done;

    setClient({
      ...client,
      checklist: updatedChecklist,
    });
  };
  const handleUpdate = async () => {
    try {
      setSaving(true);

      const response = await api.put(`/clients/${id}`, {
        name: client.name,
        company: client.company,
        email: client.email,
        phone: client.phone,
        status: client.status,
        checklist: client.checklist,
        notes: client.notes,
      });

      toast.success(response.data.message);
    } catch (error) {
     toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      setSaving(false);
    }
  };

 const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this client?\n\nThis action cannot be undone."
  );

  if (!confirmed) return;

  try {
    setDeleting(true);

    const response = await api.delete(`/clients/${id}`);

    toast.success(response.data.message);

    navigate("/clients");
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete Failed");
  } finally {
    setDeleting(false);
  }
};

  if (loading) {
    return (
      <div className="text-center py-20 text-slate-500">
        Loading Client...
      </div>
    );
  }

  if (notFound || !client) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Client Not Found</h2>

        <Link
          to="/clients"
          className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-2 text-white"
        >
          Back to Clients
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <Link
        to="/clients"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to Clients
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-700">
            {getInitials(client.name)}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {client.name}
            </h1>

            <p className="text-slate-600 mt-1">
              {client.company}
            </p>

            <div className="mt-3">
              {getStatusBadge(client.status)}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Client Name
          </label>

          <input
            type="text"
            value={client.name}
            onChange={(e) =>
              setClient({
                ...client,
                name: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Company
          </label>

          <input
            type="text"
            value={client.company}
            onChange={(e) =>
              setClient({
                ...client,
                company: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email
          </label>

          <input
            type="email"
            value={client.email}
            onChange={(e) =>
              setClient({
                ...client,
                email: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Phone
          </label>

          <input
            type="text"
            value={client.phone}
            onChange={(e) =>
              setClient({
                ...client,
                phone: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Status
          </label>

          <select
            value={client.status}
            onChange={handleStatusChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          >
            {STATUS_OPTIONS.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Notes
          </label>

          <textarea
            rows={4}
            value={client.notes}
            onChange={(e) =>
              setClient({
                ...client,
                notes: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Onboarding Checklist
          </h2>

          <div className="space-y-3">
            {client.checklist?.map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-3"
              >
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => handleChecklistToggle(index)}
                  className="h-4 w-4 cursor-pointer"
                />


                <span
                  className={
                    item.done
                      ? "line-through text-slate-400"
                      : "text-slate-700"
                  }
                >
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-2">


          <button
            onClick={handleUpdate}
            disabled={saving}
            className="rounded-xl bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Client"}
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 size={18} />
            {deleting ? "Deleting..." : "Delete Client"}
          </button>

        </div>
      </div>
    </div>
  );
}