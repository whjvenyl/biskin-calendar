import { PlainDate, type PlainYearMonth } from "./temporal.js";

export type DaysOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function today() {
  return PlainDate.from(new Date());
}

export function startOfWeek(
  date: PlainDate,
  firstDayOfWeek: DaysOfWeek = 0
): PlainDate {
  const d = date.toDate();
  const day = d.getUTCDay();
  const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;

  d.setUTCDate(d.getUTCDate() - diff);
  return PlainDate.from(d);
}

export function getWeekNumber(date: PlainDate, firstDayOfWeek: DaysOfWeek = 0): number {
  // Copy date so don't modify original
  const newDate = date.toDate();
  // Adjust the start day
  newDate.setUTCDate(newDate.getUTCDate() + 4 - ((newDate.getUTCDay() + 6 + firstDayOfWeek) % 7));
  // Set to nearest Thursday: current date + 4 - current day number. Make Sunday's day number 7
  const yearStart = new Date(Date.UTC(newDate.getUTCFullYear(), 0, 1));
  // Get first day of year
  // Calculate full weeks to nearest Thursday
  return Math.ceil(((newDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function endOfWeek(
  date: PlainDate,
  firstDayOfWeek: DaysOfWeek = 0
): PlainDate {
  return startOfWeek(date, firstDayOfWeek).add({ days: 6 });
}

export function endOfMonth(date: { year: number; month: number }): PlainDate {
  return PlainDate.from(new Date(Date.UTC(date.year, date.month, 0)));
}

interface ToDate {
  toDate(): Date;
}

export function compare(a: ToDate, b: ToDate) {
  const aDate = a.toDate();
  const bDate = b.toDate();

  if (aDate < bDate) return -1;
  if (aDate > bDate) return 1;
  return 0;
}

/**
 * Ensures date is within range, returns min or max if out of bounds
 */
export function clamp(
  date: PlainDate,
  min?: PlainDate,
  max?: PlainDate
): PlainDate {
  if (min && PlainDate.compare(date, min) < 0) {
    return min;
  }

  if (max && PlainDate.compare(date, max) > 0) {
    return max;
  }

  return date;
}

/**
 * Check if date is within a min and max
 */
export function inRange(
  date: PlainDate,
  minDate?: PlainDate,
  maxDate?: PlainDate
): boolean {
  return clamp(date, minDate, maxDate) === date;
}

/**
 * given start and end date, return an (inclusive) array of all dates in between
 * @param start
 * @param end
 */
function getDaysInRange(start: PlainDate, end: PlainDate): PlainDate[] {
  const duration = { days: 1 };
  const days: PlainDate[] = [start];

  while (!start.equals(end)) {
    start = start.add(duration);
    days.push(start);
  }

  return days;
}

function chunk<T>(array: T[], chunkSize: number): T[][] {
  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}

/**
 * given a date, return an array of dates from a calendar perspective
 */
export function getViewOfMonth(
  yearMonth: PlainYearMonth,
  firstDayOfWeek: DaysOfWeek = 0
): PlainDate[][] {
  const start = startOfWeek(yearMonth.toPlainDate(), firstDayOfWeek);
  const end = endOfWeek(endOfMonth(yearMonth), firstDayOfWeek);

  return chunk(getDaysInRange(start, end), 7);
}
