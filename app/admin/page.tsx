"use client";
import { useState } from "react";
import { DemoButton } from "@/components/DemoButton";
export default function Admin(){
 const [pass,setPass]=useState(""); const [ok,setOk]=useState(false);
 return <div className="mx-auto max-w-3xl px-4 py-8"><h1 className="text-3xl font-black">Admin</h1>{!ok?<div className="mt-6 rounded-2xl border border-white/10 bg-panel p-6"><p className="text-sm text-slate-400">Hackathon demo admin access.</p><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" className="mt-4 w-full rounded-xl border border-white/10 bg-black/20 p-3"/><button onClick={()=>setOk(pass==="vehari123")} className="mt-3 rounded-xl bg-white px-4 py-3 font-bold text-black">Unlock</button>{pass && pass!=="vehari123"&&<p className="mt-2 text-sm text-red-400">Incorrect password.</p>}</div>:<div className="mt-6 rounded-2xl border border-white/10 bg-panel p-6"><h2 className="font-bold">Demo controls</h2><p className="mt-2 text-sm text-slate-400">Populate the app with 200 realistic mock reports across five Vehari areas.</p><div className="mt-4"><DemoButton/></div></div>}</div>;
}
