"use client";
import { useEffect } from "react";
import { generateMockReports } from "@/lib/prediction";
import { useStore, Report } from "@/store/useStore";

const areas = ["Vehari City","Burewala","Mailsi","Luddan","Tibba Sultan Pur"];

export function useReports(){
  const {reports,setReports,addReport,selectedArea,setSelectedArea} = useStore();
  
  useEffect(()=>{
    const data = generateMockReports(200);
    const mapped = data.map((r:any,i:number)=>{
      return {
        ...r,
        id: `demo-${i}`,
        lat: 30.0433 + Math.random()*0.2,
        lng: 72.35 + Math.random()*0.2
      } as Report;
    });
    setReports(mapped);
  },[setReports]);

  const submitReport=async(status:"ON"|"OFF")=>{
    const r={
      id:`local-${Date.now()}`,
      status,
      timestamp: Date.now(),
      lat: 30.0433,
      lng: 72.3528,
      area: "Vehari City",
      uid: "anon",
      pending: false
    } as Report;
    addReport(r);
  };

  return {
    reports,
    selectedArea,
    setSelectedArea,
    submitReport,
    areas,
    demoMode: true
  };
}