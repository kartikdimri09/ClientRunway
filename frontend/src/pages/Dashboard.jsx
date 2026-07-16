import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Sparkles,
  Rocket,
  TriangleAlert,
  BadgeCheck,
  BellRing,
  Plus,
} from "lucide-react";
import { getClients } from "../services/clientService";
import {
  getProgress,
  getStatusBadge,
  getInitials,
} from "../utils/ClientHelpers";

export default function Dashboard() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients().then(setClients);
  }, []);

  const stats = useMemo(() => {
    const counts = {
      total: clients.length,
      "Just Started": 0,
      "In Progress": 0,
      Stuck: 0,
      Live: 0,
    };

    clients.forEach((client) => {
      counts[client.status] = (counts[client.status] || 0) + 1;
    });

    return counts;
  }, [clients]);

  const recentClients = clients.slice(0, 5);

  const stuckClients = useMemo(
    () => clients.filter((client) => client.status === "Stuck"),
    [clients]
  );

  const statusBreakdown = useMemo(() => {
    const items = [
      {
        label: "Just Started",
        value: stats["Just Started"],
        barColor: "bg-slate-500",
        trackColor: "bg-slate-100",
        textColor: "text-slate-700",
      },
      {
  label: "In Progress",
  value: stats["In Progress"],
  barColor: "bg-indigo-500",
  trackColor: "bg-indigo-100",
  textColor: "text-indigo-700",
},
      {
        label: "Stuck",
        value: stats.Stuck,
        barColor: "bg-red-500",
        trackColor: "bg-red-100",
        textColor: "text-red-700",
      },
      {
        label: "Live",
        value: stats.Live,
        barColor: "bg-emerald-500",
        trackColor: "bg-emerald-100",
        textColor: "text-emerald-700",
      },
    ];

    const maxValue = Math.max(...items.map((item) => item.value), 1);

    return items.map((item) => ({
      ...item,
      percent: Math.round((item.value / maxValue) * 100),
      share:
        stats.total > 0 ? Math.round((item.value / stats.total) * 100) : 0,
    }));
  }, [stats]);

  const statCards = [
    {
      title: "Total Clients",
      value: stats.total,
      subtitle: "All onboarding clients",
      Icon: Users,
      valueColor: "text-slate-900",
      iconWrap:
        "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200",
      accent: "from-slate-900/5 to-transparent",
    },
    {
  title: "Just Started",
  value: stats["Just Started"],
  subtitle: "Newly added clients",
  Icon: Sparkles,
  valueColor: "text-amber-700",
  iconWrap:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  accent: "from-amber-100/60 to-transparent",
},
   {
  title: "In Progress",
  value: stats["In Progress"],
  subtitle: "Clients currently onboarding",
  Icon: Rocket,
  valueColor: "text-indigo-700",
  iconWrap:
    "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200",
  accent: "from-indigo-100/60 to-transparent",
},
    {
      title: "Stuck",
      value: stats.Stuck,
      subtitle: "Need immediate attention",
      Icon: TriangleAlert,
      valueColor: "text-red-700",
      iconWrap: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
      accent: "from-red-100/60 to-transparent",
    },
   {
  title: "Live",
  value: stats.Live,
  subtitle: "Successfully onboarded",
  Icon: BadgeCheck,
  valueColor: "text-emerald-700",
  iconWrap:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  accent: "from-emerald-100/60 to-transparent",
},
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Overview
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
            Track client onboarding progress, monitor blockers, and keep every
            account moving toward go-live.
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

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {statCards.map((card) => {
          const Icon = card.Icon;

          return (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b ${card.accent}`}
              />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>
                  <h2
                    className={`mt-2 text-3xl font-bold tracking-tight ${card.valueColor}`}
                  >
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconWrap}`}
                >
                  <Icon size={20} />
                </div>
              </div>

              <p className="relative mt-3 text-xs leading-relaxed text-slate-500">
                {card.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Client Status Breakdown */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Client Status Breakdown
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Distribution of clients across onboarding stages
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {stats.total} clients
          </span>
        </div>

        <div className="p-6">
          <div className="space-y-5">
            {statusBreakdown.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">
                      {item.share}%
                    </span>
                    <span className={`text-sm font-bold ${item.textColor}`}>
                      {item.value}
                    </span>
                  </div>
                </div>

                <div
                  className={`h-3 overflow-hidden rounded-full ${item.trackColor}`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.barColor}`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent clients */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Clients
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A quick look at current onboarding accounts
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {recentClients.length} shown
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Progress</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {recentClients.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No clients yet. Add your first client to get started.
                    </td>
                  </tr>
                ) : (
                  recentClients.map((client) => {
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
                            <div>
                              <p className="font-semibold text-slate-900">
                                {client.name}
                              </p>
                              <p className="text-sm text-slate-500">
                                {client.contactEmail}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-slate-700">
                          {client.company}
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
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Needs Attention panel */}
        <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-700 ring-1 ring-inset ring-red-200">
                <BellRing size={18} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Needs Attention
                </h2>
                <p className="text-sm text-slate-500">
                  Clients stuck in onboarding
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-3 p-5">
            {stuckClients.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
                <p className="text-sm font-medium text-slate-700">
                  All clear
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  No stuck clients right now.
                </p>
              </div>
            ) : (
              stuckClients.map((client) => {
                const progress = getProgress(client.checklist);
                const latestNote = client.notes?.[client.notes.length - 1];

                return (
                  <div
                    key={client._id}
                    className="rounded-xl border border-red-100 bg-gradient-to-br from-red-50/80 to-white p-4 transition hover:border-red-200 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-red-600 ring-1 ring-red-100">
                          {getInitials(client.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {client.name}
                          </p>
                          <p className="text-sm text-slate-500">
                            {client.company}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(client.status)}
                    </div>

                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                        <span>Checklist progress</span>
                        <span className="font-medium text-slate-700">
                          {progress.done}/{progress.total}
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-red-100">
                        <div
                          className="h-full rounded-full bg-red-500"
                          style={{ width: `${progress.percent}%` }}
                        />
                      </div>
                    </div>

                    {latestNote && (
                      <p className="mt-3 rounded-lg bg-white/80 px-3 py-2 text-xs leading-relaxed text-slate-600 ring-1 ring-red-100">
                        {latestNote.text}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {stuckClients.length > 0 && (
            <div className="border-t border-slate-100 px-5 py-4">
              <p className="text-center text-xs font-medium text-red-600">
                {stuckClients.length} client
                {stuckClients.length !== 1 ? "s" : ""} need attention
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}