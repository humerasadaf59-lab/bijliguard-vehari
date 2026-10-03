export function saveAlertNumber(number: string) {
  if (typeof window !== "undefined") localStorage.setItem("bijliguard_whatsapp", number);
}
export function getAlertNumber() {
  return typeof window !== "undefined" ? localStorage.getItem("bijliguard_whatsapp") || "" : "";
}
export async function sendBrowserAlert(title: string, body: string) {
  if (typeof window === "undefined" || !("Notification" in window)) return false;
  if (Notification.permission === "default") await Notification.requestPermission();
  if (Notification.permission === "granted") {
    new Notification(title, { body });
    return true;
  }
  return false;
}
export async function sendWhatsAppAlert(message: string, number: string) {
  const response = await fetch("/api/whatsapp", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({message, number}) });
  return response.ok;
}
