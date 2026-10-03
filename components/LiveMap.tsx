"use client";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Report } from "@/store/useStore";

export function LiveMap({reports}:{reports:Report[]}) {
 return <div className="h-[520px] overflow-hidden rounded-2xl border border-white/10">
 <MapContainer center={[30.0433,72.3528]} zoom={10} scrollWheelZoom={true}>
 <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
 {reports.slice(0,50).map(r=><CircleMarker key={r.id} center={[r.lat,r.lng]} radius={7} pathOptions={{color:r.status==="ON"?"#22c55e":"#ef4444",fillColor:r.status==="ON"?"#22c55e":"#ef4444",fillOpacity:.85}}>
 <Popup><b>{r.area}</b><br/>{r.status==="ON"?"Power ON":"Power OFF"}<br/>{new Date(r.timestamp).toLocaleString()}</Popup></CircleMarker>)}
 </MapContainer></div>;
}
