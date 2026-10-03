"use client";
import { generateMockReports } from "@/lib/prediction";
import { useStore } from "@/store/useStore";
export function DemoButton() {
  const setReports=useStore(s=>s.setReports), setDemo=useStore(s=>s.setDemoMode);
  return <button onClick={()=>(setReports(generateMockReports(200).map((r,i)=>({...r,id:`demo-${i}`, lat: 30.045 + Math.random()*0.2, lng: 72.35 + Math.random()*0.2} as any))),setDemo(true))} className="rounded-xl bg-electric px-4 py-3 font-bold text-black">Load 200 Demo Reports</button>;
}