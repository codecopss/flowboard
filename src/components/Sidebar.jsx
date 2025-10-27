import React, { useState } from "react";
import { Home, Settings, Calendar, ListTodo, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Tasks", path: "/", icon: <ListTodo size={20} /> },
  { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
  { name: "Calendar", path: "/calendar", icon: <Calendar size={20} /> },
  { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-800/60 backdrop-blur-xl border-r border-slate-700">
        <div className="p-6 text-2xl font-semibold text-accent-cyan">
          FlowBoard
        </div>
        <nav className="flex flex-col mt-4 space-y-2 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-slate-700 text-accent-cyan"
                    : "text-slate-300 hover:bg-slate-700/50"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="flex md:hidden justify-between items-center p-4 bg-slate-900/70 border-b border-slate-700 fixed top-0 left-0 right-0 z-30 backdrop-blur-md">
        <button
          onClick={() => setOpen(!open)}
          className="text-accent-cyan focus:outline-none"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="text-xl font-semibold text-accent-cyan">FlowBoard</div>
        <div className="w-6" />
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 1, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 50, damping: 18 },
                opacity: { duration: 0.35, ease: "easeInOut" },
              }}
              className="fixed top-0 left-0 h-full w-64 bg-slate-900/90 backdrop-blur-md border-r border-slate-700 z-50 flex flex-col shadow-xl"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center p-6">
                <div className="text-2xl font-semibold text-accent-cyan">
                  FlowBoard
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-accent-cyan transition"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Nav Items */}
              <nav className="flex flex-col mt-2 space-y-2 px-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
                        isActive
                          ? "bg-slate-700 text-accent-cyan"
                          : "text-slate-300 hover:bg-slate-700/50"
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
