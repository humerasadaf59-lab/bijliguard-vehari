import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { message, number } = await req.json();
  const sid=process.env.TWILIO_ACCOUNT_SID, token=process.env.TWILIO_AUTH_TOKEN, from=process.env.TWILIO_WHATSAPP_FROM;
  if (!sid || !token || !from || !number) return NextResponse.json({ok:false, mode:"browser-fallback", message:"Twilio is optional; use browser notifications."});
  const body=new URLSearchParams({From:from,To:`whatsapp:${number}`,Body:message});
  const auth=Buffer.from(`${sid}:${token}`).toString("base64");
  const r=await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,{method:"POST",headers:{"Authorization":`Basic ${auth}`,"Content-Type":"application/x-www-form-urlencoded"},body});
  return NextResponse.json({ok:r.ok,twilioStatus:r.status});
}
