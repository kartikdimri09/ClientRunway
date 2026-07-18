import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipboardList, BellRing, BarChart3 } from "lucide-react";
import Logo from "../assets/logo.png";
import api from "../services/api";
import toast from "react-hot-toast";

const INITIAL_FORM = {
  email: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (event) => {
  event.preventDefault();

  if (!validate()) return;

  setLoading(true);

  try {
  const response = await api.post("/auth/login", {
    email: form.email.trim(),
    password: form.password,
  });

  toast.success(response.data.message);

  navigate("/");
} catch (error) {
  toast.error(error.response?.data?.message || "Login Failed");
} finally {
  setLoading(false);
}
};
  const inputClassName = (field) =>
    `w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
        : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
    }`;

  const features = [
    {
      Icon: ClipboardList,
      title: "Onboarding checklists",
      text: "Track every step from docs to go-live approval",
    },
    {
      Icon: BellRing,
      title: "Stuck client alerts",
      text: "Surface accounts that need attention before they slip",
    },
    {
      Icon: BarChart3,
      title: "Status visibility",
      text: "See pipeline health across all active clients at a glance",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left branding panel */}
      <div className="relative flex flex-1 flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-8 py-10 text-white lg:px-12 lg:py-14">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute right-1/3 top-1/2 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
        </div>

        <div className="relative">
          {/* Logo */}
          <div>
            <div className="flex justify-start">
  <img
    src={Logo}
    alt="ClientRunway"
    className="h-20 w-auto object-contain -ml-16"
  />
</div>
            
          </div>

          {/* Headline */}
          <h1 className="mt-12 max-w-lg text-3xl font-bold leading-tight tracking-tight lg:text-4xl">
            Move every client to go-live faster
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300 lg:text-base">
            A single workspace to track onboarding progress, spot blockers early,
            and keep your team aligned from kickoff to launch.
          </p>

          {/* Feature bullets */}
          <ul className="mt-10 space-y-4">
            {features.map((feature) => {
              const Icon = feature.Icon;

              return (
                <li key={feature.title} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm ring-1 ring-white/10">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {feature.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-400">
                      {feature.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Trust / stat panel */}
        <div className="relative mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm lg:mt-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-2xl font-bold text-white">3.2×</p>
              <p className="mt-1 text-sm text-slate-400">
                Faster time-to-go-live
              </p>
            </div>

            <div className="hidden h-10 w-px bg-white/10 sm:block" />

            <div className="hidden sm:block">
              <p className="text-2xl font-bold text-white">94%</p>
              <p className="mt-1 text-sm text-slate-400">
                On-time onboarding rate
              </p>
            </div>

            <div className="hidden h-10 w-px bg-white/10 md:block" />

            <div className="hidden md:block">
              <p className="text-2xl font-bold text-emerald-400">Live</p>
              <p className="mt-1 text-sm text-slate-400">
                Real-time status tracking
              </p>
            </div>
          </div>

          <p className="mt-4 border-t border-white/10 pt-4 text-xs text-slate-500">
            Trusted by onboarding teams managing B2B client launches
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white">
              CR
            </div>
            <span className="text-lg font-bold text-slate-900">
              ClientRunway
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm lg:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    autoComplete="email"
                    disabled={loading}
                    className={inputClassName("email")}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={loading}
                      className={`${inputClassName("password")} pr-16`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Logging in...
                  </span>
                ) : (
                  "Log In"
                )}
              </button>

              {/* Sign up link */}
              <p className="mt-6 text-center text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-emerald-600 transition hover:text-emerald-700"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            ClientRunway &mdash; Client onboarding, simplified
          </p>
        </div>
      </div>
    </div>
  );
}