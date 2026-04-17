import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function trackLead() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
}

export function getUtmParams(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const utmParams = new URLSearchParams();
  utmKeys.forEach((key) => {
    const val = params.get(key);
    if (val) utmParams.set(key, val);
  });
  const str = utmParams.toString();
  return str ? `?${str}` : "";
}
