import React from "react";
import { motion } from "framer-motion";
import { CalendarMonthOutlined } from "@mui/icons-material";

export default function TaskCard({ task }) {
  const tagColors = {
    Work: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    Personal: "bg-pink-500/20 text-pink-400 border border-pink-500/30",
    Study: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    Urgent: "bg-red-500/20 text-red-400 border border-red-500/30",
    Default: "bg-slate-500/20 text-slate-300 border border-slate-600/30",
  };
  const tagStyle = tagColors[task.tag] || tagColors.Default;

  const isOverdue =
    task.due && !task.completed && new Date(task.due) < new Date();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="p-4 bg-slate-700/60 rounded-xl border border-slate-600 hover:border-accent-cyan transition cursor-pointer shadow-md flex flex-col gap-2"
    >
      <div className="flex justify-between items-start">
        <h3
          className={`font-semibold text-base ${
            task.completed ? "line-through text-slate-400" : "text-white"
          }`}
        >
          {task.title}
        </h3>
        {task.completed && (
          <span className="text-green-400 text-xs font-semibold">✓ Done</span>
        )}
      </div>

      {task.description && (
        <p
          className={`text-sm ${
            task.completed ? "text-slate-500 line-through" : "text-slate-300"
          }`}
        >
          {task.description}
        </p>
      )}

      <div className="flex justify-between items-center mt-3 text-xs text-slate-400">
        <span className={`px-2 py-1 rounded-md ${tagStyle}`}>
          {task.tag || "General"}
        </span>

        {task.due && (
          <div
            className={`flex items-center gap-1 ${
              isOverdue ? "text-red-400" : "text-accent-cyan"
            }`}
          >
            <CalendarMonthOutlined style={{ fontSize: "14px" }} />
            <span>{task.due}</span>
          </div>
        )}
      </div>

      {/* Completion Checkbox */}
      {task.toggleComplete && (
        <div className="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed || false}
            onChange={() => task.toggleComplete(task.id)}
            className="w-4 h-4 accent-cyan-400"
          />
          <label className="text-sm text-slate-300 select-none">
            Mark as completed
          </label>
        </div>
      )}
    </motion.div>
  );
}
