"use client";
import { PredictionResult } from "@/lib/prediction";
export function PredictionCard({prediction}:{prediction:PredictionResult}) {
  const n=prediction.nextOutage;
  return <div className="rounded-2xl border border-white/10 bg-panel p-5 shadow-glow">
    <p className="text-xs uppercase tracking-wider text-slate-400">Next likely outage</p>
    <div className="mt-2 text-2xl font-black">{((n.start%24)||12)}:00 {n.start>=12?"PM":"AM"} – {((n.end%24)||12)}:00 {n.end>=12?"PM":"AM"}</div>
    <p className="mt-2 text-sm text-red-300">{n.prob}% probability</p>
  </div>;
}
