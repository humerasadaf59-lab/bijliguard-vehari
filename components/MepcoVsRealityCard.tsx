export function MepcoVsRealityCard({our=78,mepco=38}:{our?:number;mepco?:number}) {
 return <div className="rounded-2xl border border-white/10 bg-panel p-5"><p className="text-xs uppercase tracking-wider text-slate-400">Prediction accuracy</p>
 <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-xl bg-cyan-400/10 p-4"><div className="text-3xl font-black">{our}%</div><div className="text-xs text-slate-400">BijliGuard</div></div><div className="rounded-xl bg-white/5 p-4"><div className="text-3xl font-black">{mepco}%</div><div className="text-xs text-slate-400">MEPCO baseline</div></div></div></div>;
}
