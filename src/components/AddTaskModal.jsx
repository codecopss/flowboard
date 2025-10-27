import React, { useState, useEffect } from "react";

const tags = ["Work", "Personal", "Study", "Urgent"];

export default function AddTaskModal({ open, onClose, onSave, editTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("Work");
  const [due, setDue] = useState("");

  // Reset or populate form whenever modal opens or editTask changes
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description || "");
      setTag(editTask.tag || "Work");
      setDue(editTask.due || "");
    } else if (open) {
      // New task — reset
      setTitle("");
      setDescription("");
      setTag("Work");
      setDue("");
    }
  }, [editTask, open]);

  // Handle save
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Task title cannot be empty");
    onSave({
      id: editTask?.id,
      title,
      description,
      tag,
      due,
    });
    handleClose();
  };

  // Reset form on close
  const handleClose = () => {
    setTitle("");
    setDescription("");
    setTag("Work");
    setDue("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        className="bg-slate-800 p-6 rounded-xl w-11/12 max-w-md shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-white mb-4">
          {editTask ? "Edit Task" : "Add Task"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded-md mb-3 bg-slate-700 text-white placeholder:text-slate-400"
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded-md mb-3 bg-slate-700 text-white placeholder:text-slate-400 resize-none"
        />

        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="flex-1 p-2 rounded-md bg-slate-700 text-white"
          >
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            className="flex-1 p-2 rounded-md bg-slate-700 text-white"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-400 transition text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
