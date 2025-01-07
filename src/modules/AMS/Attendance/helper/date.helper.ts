import { format, toZonedTime } from "date-fns-tz";

const TIMEZONE = "Asia/Karachi";

// Get the current time in PST (Pakistan Standard Time)
export function getCurrentTimeInPST(): Date {
  const now = new Date();
  return toZonedTime(now, TIMEZONE); // Convert UTC to PST
}

// Convert a date from a specific timezone to UTC
export function convertToUTC(date: Date): Date {
  // Convert the input date (assumed to be in the target timezone) to UTC
  return new Date(date);
}

// Convert a UTC date to PST
export function convertToPST(date: Date): Date {
  return toZonedTime(date, TIMEZONE);
}

// Format a date in PST
export function formatTime(date: Date): string {
  return format(toZonedTime(date, TIMEZONE), "yyyy-MM-dd HH:mm:ss", {
    timeZone: TIMEZONE,
  });
}
