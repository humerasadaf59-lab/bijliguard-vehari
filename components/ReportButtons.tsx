"use client";
import { motion } from "framer-motion";
import { useReports } from "@/hooks/useReports";
export function ReportButtons() {
  const { submitReport } = useReports();
  return <div className="grid grid-cols-2 gap-3">
    <motion.button whileTap={{scale:.97}} onClick={()=>submitReport("OFF")} className="rounded-2xl bg-red-500/15 p-5 text-left ring-1 ring-red-400/30">
      <div className="text-2xl">⚡</div><div className="mt-2 font-bold">Light Gayi</div><div className="text-xs text-slate-400">Power OFF • one tap</div>
    </motion.button>
    <motion.button whileTap={{scale:.97}} onClick={()=>submitReport("ON")} className="rounded-2xl bg-emerald-500/15 p-5 text-left ring-1 ring-emerald-400/30">
      <div className="text-2xl">💡</div><div className="mt-2 font-bold">Light Aayi</div><div className="text-xs text-slate-400">Power ON • one tap</div>
    </motion.button>
  </div>;
}
