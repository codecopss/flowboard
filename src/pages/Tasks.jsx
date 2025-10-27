import React, { useState } from "react";
import AddTaskModal from "../components/AddTaskModal";
import TaskCard from "../components/TaskCard";
import useTasks from "../hooks/useTasks";

export default function Tasks() {
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTasks();
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleSave = (task) => {
    if (!task) return;
    task.id ? updateTask(task) : addTask(task);
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) deleteTask(id);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="p-4 space-y-6 fade-in min-h-screen transition-colors bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-cyan-600 dark:text-cyan-400">
            All Tasks
          </h2>
          <p className="text-light-muted dark:text-dark-muted mt-1">
            Manage, edit, and track your tasks.
          </p>
        </div>
        <button
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white rounded-lg transition w-full sm:w-auto"
          onClick={() => {
            setEditTask(null);
            setOpen(true);
          }}
        >
          + Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 text-sm">
        {["all", "completed", "pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full transition-colors ${
              filter === f
                ? "bg-cyan-600 text-white dark:bg-cyan-500"
                : "bg-light-surface text-light-text dark:bg-dark-surface dark:text-dark-text hover:bg-light-muted dark:hover:bg-dark-muted"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="relative group transition-colors">
              <TaskCard task={{ ...task, toggleComplete }} />

              {/* Edit/Delete Icons */}
              <div className="absolute top-10 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(task)}
                  title="Edit"
                  className="p-1 bg-blue-500/80 dark:bg-blue-600/80 rounded hover:bg-blue-600 dark:hover:bg-blue-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l3 3M9 21H3v-6l10.586-10.586a2 2 0 012.828 0l3.172 3.172a2 2 0 010 2.828L9 21z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  title="Delete"
                  className="p-1 bg-red-500/80 dark:bg-red-600/80 rounded hover:bg-red-600 dark:hover:bg-red-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-light-muted dark:text-dark-muted text-center mt-10">
          No tasks found. Start by adding one ✨
        </p>
      )}

      {/* Modal */}
      <AddTaskModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        editTask={editTask}
      />
    </div>
  );
}
