"use client";
import { PredictionResult } from "@/lib/prediction";
export function StudyWindowCard({prediction}:{prediction:PredictionResult}) {
 return <div className="rounded-2xl border border-white/10 bg-panel p-5"><p className="text-xs uppercase tracking-wider text-slate-400">Best study windows</p>
 {prediction.bestStudyWindows.map((w,i)=><div key={i} className="mt-3 flex justify-between rounded-xl bg-white/5 p-3 text-sm"><span>{w.start%12||12}:00 {w.start>=12?"PM":"AM"} – {w.end%12||12}:00 {w.end>=12?"PM":"AM"}</span><span className="text-emerald-300">{w.prob}%</span></div>)}
 </div>;
}
