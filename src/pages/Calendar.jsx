// src/pages/Calendar.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CalendarView from "../components/CalendarView";
import useTasks from "../hooks/useTasks";

export default function Calendar() {
  const { tasks } = useTasks();
  const [groupedTasks, setGroupedTasks] = useState({});

  useEffect(() => {
    if (!tasks) return;
    const grouped = tasks.reduce((acc, task) => {
      const date = task.due || "No Due Date";
      if (!acc[date]) acc[date] = [];
      acc[date].push(task);
      return acc;
    }, {});
    setGroupedTasks(grouped);
  }, [tasks]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-4 fade-in space-y-6"
    >
      {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Calendar</h2>
          <p className="text-slate-400 text-sm mt-1">
            View your tasks by due date
          </p>
        </div>
      </div> */}

      <CalendarView />

      {/* Grouped tasks by date */}
      <div className="space-y-6 mt-6">
        {Object.keys(groupedTasks).length === 0 ? (
          <p className="text-slate-500 text-center mt-10">
            No tasks to show on calendar 📅
          </p>
        ) : (
          Object.entries(groupedTasks).map(([date, tasks]) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800/40 border border-slate-700 rounded-xl p-4"
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                {date === "No Due Date" ? "No Due Date" : new Date(date).toDateString()}
              </h3>
              <ul className="space-y-2 text-slate-300">
                {tasks.map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between items-center bg-slate-900/50 rounded-lg px-3 py-2"
                  >
                    <span className={`${t.completed ? "line-through text-slate-500" : ""}`}>
                      {t.title}
                    </span>
                    <span className="text-xs text-slate-500">{t.tag || "No Tag"}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
