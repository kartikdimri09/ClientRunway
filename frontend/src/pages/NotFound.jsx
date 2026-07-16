import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-inset ring-red-200">
          <AlertTriangle size={28} />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
          Error 404
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Page not found
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
          The page you’re looking for doesn’t exist, may have been moved, or the
          URL might be incorrect.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow-md"
          >
            <Home size={16} />
            Go to Dashboard
          </Link>

          <Link
            to="/clients"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to Clients
          </Link>
        </div>
      </div>
    </div>
  );
}