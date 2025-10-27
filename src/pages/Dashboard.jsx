// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import useTasks from "../hooks/useTasks";

export default function Dashboard() {
  const { tasks } = useTasks();
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    overdue: 0,
    total: 0,
    streak: 0,
  });

  useEffect(() => {
    if (!tasks) return;

    const today = new Date().toISOString().slice(0, 10);
    const completed = tasks.filter((t) => t.completed).length;
    const pending = tasks.filter((t) => !t.completed).length;
    const overdue = tasks.filter(
      (t) => !t.completed && new Date(t.due) < new Date(today)
    ).length;

    // Compute streak
    let streak = 0;
    const sorted = [...tasks]
      .filter((t) => t.completedAt)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

    let lastDate = null;
    for (let t of sorted) {
      const date = t.completedAt.slice(0, 10);
      if (!lastDate) lastDate = date;
      const diff = Math.floor(
        (new Date(lastDate) - new Date(date)) / (1000 * 60 * 60 * 24)
      );
      if (diff === 0 || diff === 1) {
        streak++;
        lastDate = date;
      } else break;
    }

    setStats({
      completed,
      pending,
      overdue,
      total: tasks.length,
      streak,
    });
  }, [tasks]);

  return (
    <div className="p-6 fade-in space-y-6">
      <h2 className="text-2xl font-semibold text-accent-cyan">Dashboard Insights</h2>
      <p className="text-slate-400 mb-6">
        Analyze your progress, habits, and performance.
      </p>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Tasks", value: stats.total, color: "bg-slate-700" },
          { label: "Completed", value: stats.completed, color: "bg-green-600" },
          { label: "Pending", value: stats.pending, color: "bg-cyan-600" },
          { label: "Overdue", value: stats.overdue, color: "bg-red-600" },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-xl p-4 text-center text-white ${item.color}`}
          >
            <div className="text-3xl font-bold">{item.value}</div>
            <div className="text-slate-200 text-sm mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Streak */}
      <div className="bg-slate-800 rounded-xl p-6 mt-6">
        <h3 className="text-xl text-white font-semibold mb-2">🔥 Streak</h3>
        <p className="text-slate-300">
          You’ve maintained a <span className="text-cyan-400">{stats.streak}-day streak</span> of completing tasks!
        </p>
      </div>

      {/* Insights Placeholder */}
      <div className="bg-slate-800 rounded-xl p-6 mt-6">
        <h3 className="text-xl text-white font-semibold mb-3">📊 Coming Soon</h3>
        <p className="text-slate-400">
          Visual analytics like completion charts, tag-based insights, and productivity trends will appear here.
        </p>
      </div>
    </div>
  );
}
