import { clsx, type ClassValue } from "clsx"
import { format, parseISO } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Renders a calendar event's dates. Single-day events print one date; a range
 * that stays inside one month is collapsed to "12 – 17 October 2026".
 */
export function formatDateRange(startDate: string, endDate?: string) {
  const start = parseISO(startDate)
  if (!endDate || endDate === startDate) return format(start, "d MMMM yyyy")

  const end = parseISO(endDate)
  const sameMonth =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth()

  return sameMonth
    ? `${format(start, "d")} – ${format(end, "d MMMM yyyy")}`
    : `${format(start, "d MMM yyyy")} – ${format(end, "d MMM yyyy")}`
}
