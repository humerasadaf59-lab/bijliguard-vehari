"use client";
import dynamic from "next/dynamic";
import { useReports } from "@/hooks/useReports";

const LiveMap = dynamic(
  () => import("@/components/LiveMap").then((m) => m.LiveMap),
  { ssr: false, loading: () => <p style={{padding:20}}>Loading Map...</p> }
);

export default function MapPage() {
  const { reports } = useReports();
  return <LiveMap reports={reports} />;
}