"use client";
import { useMemo } from "react";
import { ReportButtons } from "@/components/ReportButtons";
import { PredictionCard } from "@/components/PredictionCard";
import { StudyWindowCard } from "@/components/StudyWindowCard";
import { MepcoVsRealityCard } from "@/components/MepcoVsRealityCard";
import { TimelineGraph } from "@/components/TimelineGraph";
import { useReports } from "@/hooks/useReports";
import { predictOutage } from "@/lib/prediction";
import { useStore } from "@/store/useStore";
import Link from "next/link";

export default function Dashboard() {
 const {reports,selectedArea,setSelectedArea,areas}=useReports();
 const prediction=useMemo(()=>predictOutage(selectedArea,reports.map(r=>({status:r.status,timestamp:r.timestamp,area:r.area,uid:r.uid}))),[selectedArea,reports]);
 const current=reports.find(r=>r.area===selectedArea);
 return <div className="mx-auto max-w-7xl px-4 py-8">
   <section className="mb-8">
    <p className="text-sm text-cyan-300">WarriorHacks 2.0 • Community infrastructure</p>
    <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">Know when the <span className="text-electric">light</span> goes.</h1>
    <p className="mt-4 max-w-2xl text-slate-400">BijliGuard combines community reports with a lightweight prediction engine to make Vehari load shedding more predictable.</p>
   </section>
   <div className="mb-5 flex flex-wrap items-center gap-3"><label className="text-sm text-slate-400">Area</label><select value={selectedArea} onChange={e=>setSelectedArea(e.target.value)} className="rounded-xl border border-white/10 bg-panel px-4 py-3">{areas.map(a=><option key={a}>{a}</option>)}</select><span className="text-xs text-slate-500">{current ? `Last report: ${new Date(current.timestamp).toLocaleTimeString()}` : "Community demo data active"}</span></div>
   <ReportButtons/>
   <div className="mt-5 grid gap-4 md:grid-cols-4">
    <div className="rounded-2xl border border-white/10 bg-panel p-5"><p className="text-xs text-slate-400">Live status</p><div className={`mt-3 text-2xl font-black ${current?.status==="OFF"?"text-red-400":"text-emerald-400"}`}>{current?.status==="OFF"?"POWER OFF":"POWER ON"}</div></div>
    <PredictionCard prediction={prediction}/>
    <StudyWindowCard prediction={prediction}/>
    <MepcoVsRealityCard our={prediction.dailyAccuracy.our} mepco={prediction.dailyAccuracy.mepco}/>
   </div>
   <div className="mt-5 rounded-2xl border border-white/10 bg-panel p-5"><div className="mb-3 flex items-center justify-between"><div><h2 className="font-bold">24-hour outage probability</h2><p className="text-xs text-slate-400">{selectedArea}</p></div><Link href="/map" className="text-sm text-cyan-300">Open live map →</Link></div><TimelineGraph data={prediction.timeline24h}/></div>
   <div className="mt-5 rounded-2xl border border-white/10 bg-panel p-5"><p className="text-sm font-semibold">Recommendation</p><p className="mt-2 text-sm text-slate-300">{prediction.recommendation}</p></div>
 </div>;
}
