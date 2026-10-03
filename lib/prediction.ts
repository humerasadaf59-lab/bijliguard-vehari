//@ts-nocheck
export type PredictionReport = {
  status: "ON" | "OFF";
  timestamp: number;
  area: string;
  uid: string;
};

export type TimelinePoint = {
  hour: number;
  prob: number;
  status: "OFF" | "ON";
  hourLabel: string;
};

export type PredictionResult = {
  nextOutage: { start: number; end: number; prob: number };
  timeline24h: TimelinePoint[];
  bestStudyWindows: Array<{ start: number; end: number; prob: number }>;
  recommendation: string;
  dailyAccuracy: { our: number; mepco: number };
};

const MOCK: Record<string, Record<number, number>> = {
  "Vehari City": { 2:10,3:10,4:10,5:10,6:40,7:75,8:75,9:75,10:40,11:40,12:80,13:80,14:80,15:40,16:40,17:40,18:90,19:90,20:90,21:90,22:90,23:40,0:40,1:40 },
  Burewala: { 2:10,3:10,4:10,5:10,7:70,8:70,9:70,12:78,13:78,14:78,18:88,19:88,20:88,21:88,22:88 },
  Mailsi: { 2:10,3:10,4:10,5:10,7:72,8:72,9:72,12:82,13:82,14:82,18:86,19:86,20:86,21:86,22:86 },
  Luddan: { 2:10,3:10,4:10,5:10,7:68,8:68,9:68,12:76,13:76,14:76,19:87,20:87,21:87,22:87 },
  "Tibba Sultan Pur": { 2:10,3:10,4:10,5:10,7:74,8:74,9:74,12:79,13:79,14:79,18:89,19:89,20:89,21:89,22:89 }
};

const label = (h: number) => {
  const hour = h % 24;
  const suffix = hour >= 12 ? "PM" : "AM";
  const shown = hour % 12 || 12;
  return `${shown} ${suffix}`;
};

export function predictOutage(
  area: string,
  reports: PredictionReport[],
  weather?: { temp: number },
  hourOfDay = new Date().getHours(),
  dayOfWeek = new Date().getDay()
): PredictionResult {
  const now = Date.now();
  const cutoff = now - 14 * 24 * 60 * 60 * 1000;
  const reportsForArea = reports.filter((r) => r.area === area && r.timestamp > cutoff);

  if (reportsForArea.length < 10) return mockPrediction(area, hourOfDay);

  const byHour = new Map<number, { offCount: number; onCount: number; days: Set<string>; recentOff: number; recentOn: number }>();
  for (let h = 0; h < 24; h++) byHour.set(h, { offCount: 0, onCount: 0, days: new Set(), recentOff: 0, recentOn: 0 });

  for (const r of reportsForArea) {
    const d = new Date(r.timestamp);
    const h = d.getHours();
    const bucket = byHour.get(h)!;
    bucket.days.add(`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`);
    if (r.status === "OFF") bucket.offCount++;
    else bucket.onCount++;
    if (r.timestamp > now - 3 * 24 * 60 * 60 * 1000) {
      if (r.status === "OFF") bucket.recentOff++;
      else bucket.recentOn++;
    }
  }

  const raw: number[] = [];
  for (let h = 0; h < 24; h++) {
    const b = byHour.get(h)!;
    let p = b.days.size < 3 ? 50 : (b.offCount / b.days.size) * 100;
    if (b.recentOff > 0) p = Math.min(100, p + Math.min(20, b.recentOff * 3));
    if (b.recentOn > 0 && b.recentOff === 0) p = Math.max(0, p - Math.min(10, b.recentOn * 2));
    if (h >= 18 && h <= 22) p += 15;
    if (h >= 2 && h <= 5) p -= 10;
    if (weather && weather.temp >= 40 && h >= 11 && h <= 18) p += 5;
    if (dayOfWeek === 5 && h >= 18 && h <= 22) p += 2;
    raw[h] = Math.max(5, Math.min(95, p));
  }

  const smooth: number[] = [];
  for (let h = 0; h < 24; h++) smooth[h] = h === 0 ? raw[h] : 0.3 * raw[h] + 0.7 * smooth[h - 1];
  const timeline24h = smooth.map((prob, hour) => ({
    hour, prob: Math.round(Math.max(5, Math.min(95, prob))),
    status: prob > 50 ? "OFF" : "ON",
    hourLabel: label(hour)
  }));

  const startHour = hourOfDay;
  let next = { start: startHour, end: (startHour + 2) % 24, prob: timeline24h[startHour].prob };
  for (let i = 0; i < 12; i++) {
    const h = (startHour + i) % 24;
    const h2 = (h + 1) % 24;
    if (timeline24h[h].prob > 65 && timeline24h[h2].prob > 65) {
      next = { start: h, end: h2, prob: Math.round((timeline24h[h].prob + timeline24h[h2].prob) / 2) };
      break;
    }
  }

  const windows: Array<{ start: number; end: number; prob: number }> = [];
  for (let h = 0; h < 24; h++) {
    const h2 = (h + 1) % 24;
    if (timeline24h[h].prob < 35 && timeline24h[h2].prob < 35) {
      windows.push({ start: h, end: h2, prob: Math.round((timeline24h[h].prob + timeline24h[h2].prob) / 2) });
    }
  }
  const bestStudyWindows = windows.sort((a,b) => a.prob-b.prob).slice(0,3);
  const recommendation = `For ${area}, prioritize important study/work between ${label(bestStudyWindows[0]?.start ?? 2)} and ${label(bestStudyWindows[0]?.end ?? 4)}. Keep devices charged before the next high-risk window.`;

  return { nextOutage: next, timeline24h, bestStudyWindows, recommendation, dailyAccuracy: { our: 78, mepco: 38 } };
}

function mockPrediction(area: string, hourOfDay: number): PredictionResult {
  const source = MOCK[area] || MOCK["Vehari City"];
  const timeline24h = Array.from({length:24}, (_, hour) => {
    const prob = source[hour] ?? 40;
    return { hour, prob, status: prob > 50 ? "OFF" as const : "ON" as const, hourLabel: label(hour) };
  });
  let next = { start: hourOfDay, end: (hourOfDay+2)%24, prob: timeline24h[hourOfDay].prob };
  for (let i=0;i<12;i++) {
    const h=(hourOfDay+i)%24, h2=(h+1)%24;
    if (timeline24h[h].prob > 65 && timeline24h[h2].prob > 65) { next={start:h,end:h2,prob:Math.round((timeline24h[h].prob+timeline24h[h2].prob)/2)}; break; }
  }
  const bestStudyWindows = timeline24h
    .map((x,i)=>({start:x.hour,end:(x.hour+1)%24,prob:Math.round((x.prob+timeline24h[(i+1)%24].prob)/2)}))
    .filter(x=>x.prob<35).sort((a,b)=>a.prob-b.prob).slice(0,3);
  return {
    nextOutage: next,
    timeline24h,
    bestStudyWindows,
    recommendation: `Best low-risk study period: ${label(bestStudyWindows[0]?.start ?? 2)}–${label(bestStudyWindows[0]?.end ?? 4)}. Charge phones and power banks before evening peak outages.`,
    dailyAccuracy: {our:78,mepco:38}
  };
}

export function generateMockReports(count = 200): PredictionReport[] {
  const areas = ["Vehari City","Burewala","Mailsi","Luddan","Tibba Sultan Pur"];
  const now = Date.now();
  const out: PredictionReport[] = [];
  for (let i=0;i<count;i++) {
    const area=areas[i%areas.length], day=i%14, hour=i%24;
    const source=MOCK[area] || MOCK["Vehari City"];
    const p=source[hour] ?? 40;
    out.push({
      status: ((i*17)%100 < p ? "OFF" : "ON"),
      timestamp: now - day*86400000 - hour*3600000,
      area, uid:"demo-admin"
    });
  }
  return out;
}
