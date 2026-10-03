"use client";
import { useReports } from "@/hooks/useReports";
import { LiveMap } from "@/components/LiveMap";
export default function MapPage(){const {reports}=useReports();return <div className="mx-auto max-w-7xl px-4 py-8"><h1 className="text-3xl font-black">Live Vehari Grid</h1><p className="mt-2 text-slate-400">Last 50 community reports • green = ON • red = OFF</p><div className="mt-5"><LiveMap reports={reports}/></div><div className="mt-5 grid gap-3 md:grid-cols-5">{["Luddan","Mailsi","Burewala","Vehari City","Tibba Sultan Pur"].map(a=><div key={a} className="rounded-xl border border-white/10 bg-panel p-4"><b>{a}</b><p className="mt-1 text-xs text-slate-500">{reports.filter(r=>r.area===a).length} reports</p></div>)}</div></div>}
