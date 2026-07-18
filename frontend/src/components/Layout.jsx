import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {LayoutDashboard,Users,Menu,X,LogOut} from "lucide-react";
import LogoIcon from "../assets/logo-icon.png";
import api from "../services/api";
import toast from "react-hot-toast";
import { useEffect } from "react";


export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const openMobileMenu = () => setMobileMenuOpen(true);
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
  try {
    const response = await api.post("/auth/logout");

    toast.success(response.data.message);

    navigate("/login");
  } catch (error) {
    toast.error("Logout Failed");
  }
};
const fetchUser = async () => {
  try {
    const response = await api.get("/auth/profile");
    setUser(response.data.user);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchUser();
}, []);

  const navItems = [
    {
      to: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    {
      to: "/clients",
      label: "Clients",
      icon: Users,
    },
  ];

  const renderNavLinks = () =>
    navItems.map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={closeMobileMenu}
          className={({ isActive }) =>
            `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              isActive
                ? "bg-emerald-500/12 text-emerald-400 ring-1 ring-inset ring-emerald-500/20"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                size={18}
                className={`transition ${
                  isActive
                    ? "text-emerald-400"
                    : "text-slate-400 group-hover:text-white"
                }`}
              />
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      );
    });

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 border-r border-slate-800 bg-slate-950 text-white md:flex md:flex-col">
        <div className="border-b border-white/5 px-5 py-5">
          <div className="flex items-center gap-3">
            <div>
             <img
  src={LogoIcon}
  alt="ClientRunway"
  className="h-14 w-14 rounded-2xl"
/>
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-white">
                ClientRunway
              </h1>
              <p className="text-xs text-slate-400">
                Client onboarding tracker
              </p>
            </div>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-2 px-4 py-5">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Workspace
          </p>
          <div className="mt-2 flex flex-col gap-1">{renderNavLinks()}</div>
        </nav>
        <div className="border-t border-white/5 p-4">
  <button
    onClick={handleLogout}
    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
  >
    <LogOut size={18} />
    Logout
  </button>
</div>
      </aside>

      {/* Mobile drawer backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-slate-950/60 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-white transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-5">
            <div className="flex items-center gap-3">
              <div >
                 <img
  src={LogoIcon}
  alt="ClientRunway"
  className="h-14 w-14 rounded-2xl"
/>
              </div>
              <div>
                <h1 className="text-base font-semibold tracking-tight text-white">
                  ClientRunway
                </h1>
                <p className="text-xs text-slate-400">
                  Client onboarding tracker
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeMobileMenu}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-2 px-4 py-5">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Workspace
            </p>
            <div className="mt-2 flex flex-col gap-1">{renderNavLinks()}</div>
          </nav>
          <div className="border-t border-white/5 p-4">
  <button
    onClick={handleLogout}
    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
  >
    <LogOut size={18} />
    Logout
  </button>
</div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
  <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">

    {/* Left Side */}
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={openMobileMenu}
        className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
          ClientRunway
        </p>
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          Onboarding Workspace
        </h2>
      </div>
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-3">
      <div className="hidden md:block text-right">
        <p className="text-sm font-semibold text-slate-900">
          {user?.name}
        </p>
        <p className="text-xs text-slate-500">
          {user?.email}
        </p>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
        {user?.name?.charAt(0).toUpperCase()}
      </div>
    </div>

  </div>
</header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

