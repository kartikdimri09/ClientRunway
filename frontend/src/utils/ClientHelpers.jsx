import React from "react";

export const getProgress = (checklist = []) => {
  const done = checklist.filter((item) => item.done).length;
  const total = checklist.length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  return { done, total, percent };
};

export const getStatusBadge = (status) => {
  const styles = {
    "Just Started":
      "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200",
    "In Progress":
      "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
    Stuck: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
    Live: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] ||
        "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200"
      }`}
    >
      {status}
    </span>
  );
};

export const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};