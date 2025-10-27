import { useState, useEffect } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([
      ...tasks,
      { ...task, id: Date.now(), completed: false, completedAt: null },
    ]);
  };

  const updateTask = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : null,
            }
          : t
      )
    );
  };

  return { tasks, addTask, updateTask, deleteTask, toggleComplete };
}
