import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  ClipboardList,
  Flag,
  NotebookPen,
  Plus,
} from "lucide-react";
import { getClientById } from "../services/clientService";
import {
  getProgress,
  getStatusBadge,
  getInitials,
} from "../utils/ClientHelpers";

const STATUS_OPTIONS = ["Just Started", "In Progress", "Stuck", "Live"];

export default function ClientDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [client, setClient] = useState(null);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    getClientById(id).then((data) => {
      if (!data) {
        setNotFound(true);
        setClient(null);
      } else {
        setClient({
          ...data,
          checklist: [...data.checklist],
          notes: [...(data.notes || [])],
        });
      }
      setLoading(false);
    });
  }, [id]);

  const progress = useMemo(
    () => getProgress(client?.checklist || []),
    [client?.checklist]
  );

  const sortedNotes = useMemo(() => {
    if (!client?.notes) return [];
    return [...client.notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [client?.notes]);

  const toggleChecklistItem = (itemId) => {
    setClient((prev) => ({
      ...prev,
      checklist: prev.checklist.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item
      ),
    }));
  };

  const handleStatusChange = (event) => {
    setClient((prev) => ({
      ...prev,
      status: event.target.value,
    }));
  };

  const handleAddNote = () => {
    const text = newNote.trim();
    if (!text) return;

    const note = {
      id: Date.now(),
      text,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setClient((prev) => ({
      ...prev,
      notes: [note, ...(prev.notes || [])],
    }));
    setNewNote("");
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-32 rounded bg-slate-100" />
            <div className="h-8 w-64 rounded bg-slate-100" />
            <div className="h-4 w-48 rounded bg-slate-100" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="h-80 animate-pulse rounded-2xl border border-slate-200/80 bg-white shadow-sm" />
          <div className="h-80 animate-pulse rounded-2xl border border-slate-200/80 bg-white shadow-sm" />
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="space-y-6">
        <Link
          to="/clients"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Clients
        </Link>

        <div className="rounded-2xl border border-slate-200/80 bg-white px-6 py-16 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">Client not found</p>
          <p className="mt-2 text-sm text-slate-500">
            The client you are looking for does not exist or may have been removed.
          </p>
          <Link
            to="/clients"
            className="mt-6 inline-flex items-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            View all clients
          </Link>
        </div>
      </div>
    );
  }

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
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-bold text-slate-600">
              {getInitials(client.name)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  {client.name}
                </h1>
                {getStatusBadge(client.status)}
              </div>

              <p className="mt-1 text-lg font-medium text-slate-600">
                {client.company}
              </p>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="font-medium text-slate-500">Email</span>
                  <span>{client.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="font-medium text-slate-500">Phone</span>
                  <span>{client.contactPhone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-[220px] rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
            <div className="flex items-center gap-2 text-emerald-700">
              <BarChart3 size={16} />
              <p className="text-xs font-semibold uppercase tracking-wide">
                Overall Progress
              </p>
            </div>

            <div className="mt-3 flex items-end justify-between">
              <p className="text-2xl font-bold text-slate-900">
                {progress.percent}%
              </p>
              <p className="text-sm font-medium text-slate-500">
                {progress.done}/{progress.total} tasks
              </p>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-emerald-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          {/* Checklist */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-2">
                <ClipboardList size={18} className="text-slate-700" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Onboarding Checklist
                </h2>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Track completion of key onboarding steps
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {client.checklist.map((item) => (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-center gap-4 px-6 py-4 transition hover:bg-slate-50/80"
                >
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleChecklistItem(item.id)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />

                  <span
                    className={`text-sm font-medium ${
                      item.done
                        ? "text-slate-400 line-through"
                        : "text-slate-700"
                    }`}
                  >
                    {item.label}
                  </span>

                  <span
                    className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      item.done
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.done ? "Done" : "Pending"}
                  </span>
                </label>
              ))}
            </div>

            <div className="border-t border-slate-100 px-6 py-4">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">
                  {progress.done}/{progress.total} completed
                </span>
                <span className="text-slate-500">{progress.percent}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-2">
                <Flag size={18} className="text-slate-700" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Client Status
                </h2>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Update the current onboarding stage
              </p>
            </div>

            <div className="px-6 py-5">
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Status
              </label>
              <select
                id="status"
                value={client.status}
                onChange={handleStatusChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                <span className="text-sm text-slate-500">Current status:</span>
                {getStatusBadge(client.status)}
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Notes */}
        <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex items-center gap-2">
              <NotebookPen size={18} className="text-slate-700" />
              <h2 className="text-lg font-semibold text-slate-900">Notes</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Activity and updates for this client
            </p>
          </div>

          <div className="flex-1 space-y-3 p-6">
            {sortedNotes.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center">
                <p className="text-sm font-medium text-slate-700">No notes yet</p>
                <p className="mt-1 text-sm text-slate-500">
                  Add a note to keep track of important updates.
                </p>
              </div>
            ) : (
              sortedNotes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3"
                >
                  <p className="text-sm leading-relaxed text-slate-700">
                    {note.text}
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-400">
                    {note.createdAt}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-slate-100 px-6 py-5">
            <label
              htmlFor="newNote"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Add a note
            </label>
            <textarea
              id="newNote"
              rows={3}
              value={newNote}
              onChange={(event) => setNewNote(event.target.value)}
              placeholder="Write an update or reminder..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              type="button"
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={16} />
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}