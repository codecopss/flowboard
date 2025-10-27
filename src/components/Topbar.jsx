import React, { useState } from "react";
import { Avatar, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { Search, Sun, Moon } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";

export default function Topbar({ onSearch }) {
  const [query, setQuery] = useState("");
  const { theme, toggleTheme } = useThemeContext();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-gray-100 dark:bg-dark-surface/50 border-b border-gray-200 dark:border-dark-surface backdrop-blur-lg px-4 md:px-8 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-16 md:mt-0 transition-colors"
    >
      <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent tracking-wide text-center sm:text-left">
        FlowBoard
      </h1>

      <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-3">
        <div className="relative w-full sm:w-64 md:w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-dark-muted pointer-events-none"
          />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            value={query}
            onChange={handleSearchChange}
            sx={{
              input: { color: theme === "dark" ? "#f8fafc" : "#1e293b", paddingLeft: "1.8rem" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: theme === "dark" ? "#475569" : "#cbd5e1" },
                "&:hover fieldset": { borderColor: "#38bdf8" },
                "&.Mui-focused fieldset": { borderColor: "#38bdf8" },
              },
              width: "100%",
              backgroundColor: theme === "dark" ? "rgba(30,41,59,0.7)" : "rgba(243,244,246,0.8)",
              borderRadius: "8px",
            }}
          />
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-dark-surface/70 hover:bg-gray-300 dark:hover:bg-dark-surface/50 transition-colors"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <Avatar
          alt="User"
          src="https://i.pravatar.cc/40"
          sx={{ width: { xs: 36, md: 40 }, height: { xs: 36, md: 40 } }}
        />
      </div>
    </motion.header>
  );
}
