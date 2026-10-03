"use client";
import { useState } from "react";
export function UrduToggle() {
  const [urdu,setUrdu]=useState(false);
  return <button onClick={()=>setUrdu(!urdu)} className="rounded-lg border border-white/10 px-3 py-2 text-xs">{urdu?"اردو":"EN"}</button>;
}
