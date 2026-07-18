import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ArrowRight, Search } from "lucide-react";
import { getClients } from "../services/clientService";
import {
  getProgress,
  getStatusBadge,
  getInitials,
} from "../utils/ClientHelpers";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchClients();
}, []);
  const filteredClients = clients.filter((client) => {
    const searchTerm = search.toLowerCase();

    if (loading) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500"></div>

        <p className="mt-4 text-sm text-slate-500">
          Loading clients...
        </p>
      </div>
    </div>
  );
}
    return (
      client.name.toLowerCase().includes(searchTerm) ||
      client.company.toLowerCase().includes(searchTerm)
    );
  });
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Directory
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Clients
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
            View and manage all onboarding accounts in one place.
          </p>
        </div>

        <Link
          to="/clients/new"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow-md"
        >
          <Plus size={16} />
          Add Client
        </Link>
      </div>

      {/* Clients list */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
       <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
    <h2 className="text-lg font-semibold text-slate-900">
      All Clients
    </h2>
    <p className="mt-1 text-sm text-slate-500">
      Complete list of onboarding accounts
    </p>
  </div>

  <div className="flex items-center gap-3">
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        placeholder="Search client or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-72 rounded-xl border border-slate-200 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500"
      />
    </div>

    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
      {filteredClients.length} total
    </span>
  </div>
</div>

        {clients.length === 0 ? (
  <div className="px-6 py-12 text-center text-sm text-slate-500">
    No clients yet. Add your first client to get started.
  </div>
) : filteredClients.length === 0 ? (
  <div className="px-6 py-12 text-center">
    <h3 className="text-lg font-semibold text-slate-800">
      No clients found
    </h3>

    <p className="mt-2 text-sm text-slate-500">
      Try searching with another client or company name.
    </p>
  </div>
) : (
          <>
            {/* Mobile card layout */}
            <div className="divide-y divide-slate-100 md:hidden">
              {filteredClients.map((client) => {
                const progress = getProgress(client.checklist);

                return (
                  <div key={client._id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                          {getInitials(client.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {client.name}
                          </p>
                          <p className="text-sm font-medium text-slate-600">
                            {client.company}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(client.status)}
                    </div>

                    <div className="mt-3">
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">
                          {progress.done}/{progress.total}
                        </span>
                        <span className="text-slate-500">
                          {progress.percent}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all"
                          style={{ width: `${progress.percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-slate-500">
                        {client.email}
                      </p>
                      <p className="text-xs text-slate-500">
                        {client.phone}
                      </p>
                    </div>

                    <div className="mt-4">
                      <Link
                        to={`/clients/${client._id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        View
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop table layout */}
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-6 py-3">Client</th>
                    <th className="px-6 py-3">Company</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Progress</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredClients.map((client) => {
                    const progress = getProgress(client.checklist);

                    return (
                      <tr
                        key={client._id}
                        className="transition hover:bg-slate-50/80"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                              {getInitials(client.name)}
                            </div>
                            <p className="font-semibold text-slate-900">
                              {client.name}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-slate-700">
                          {client.company}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {client.email}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {client.phone}
                        </td>

                        <td className="px-6 py-4">
                          {getStatusBadge(client.status)}
                        </td>

                        <td className="px-6 py-4">
                          <div className="min-w-[120px]">
                            <div className="mb-1.5 flex items-center justify-between text-xs">
                              <span className="font-semibold text-slate-700">
                                {progress.done}/{progress.total}
                              </span>
                              <span className="text-slate-500">
                                {progress.percent}%
                              </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-emerald-500 transition-all"
                                style={{ width: `${progress.percent}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <Link
                            to={`/clients/${client._id}`}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                          >
                            View
                            <ArrowRight size={14} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}