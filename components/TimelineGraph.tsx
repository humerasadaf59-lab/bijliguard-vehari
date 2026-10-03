"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
export function TimelineGraph({data}:{data:{hourLabel:string;prob:number}[]}) {
 return <div className="h-72 w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><XAxis dataKey="hourLabel" interval={2} stroke="#94a3b8"/><YAxis domain={[0,100]} stroke="#94a3b8"/><Tooltip contentStyle={{background:"#0d1b2a",border:"1px solid #334155"}}/><Area type="monotone" dataKey="prob" stroke="#22d3ee" fill="#22d3ee" fillOpacity={.12}/></AreaChart></ResponsiveContainer></div>;
}
