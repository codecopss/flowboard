import React from "react";
import { motion } from "framer-motion";

export default function CalendarView() {
  return (
<motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 text-center"
    >
      <h2 className="text-xl font-semibold text-accent-cyan">Calendar View</h2>
      {/* <p className="text-slate-400 mt-3 text-sm">
        Coming soon — visualize tasks across dates 📅
      </p> */}
    </motion.div>
  );
}
    