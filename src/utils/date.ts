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

export function getWeekNumber(date: PlainDate): number {
  const MILLISECONDS_IN_WEEK = 604800000

  const d = date.toDate();
  const day = d.getUTCDay();

  // ISO week date weeks start on Monday, so correct the day number
  const dayNum = (day + 6) % 7;

  // Set the target to the nearest Thursday (current date + 4 - current day number)
  d.setDate(d.getDate() - dayNum + 3);

  // ISO 8601 week number of the year for this date
  const firstThursday = d.valueOf();

  // Set the target to the first day of the year
  // First set the target to January 1st
  d.setMonth(0, 1);

  // If this is not a Thursday, set the target to the next Thursday
  if (d.getDay() !== 4) {
    d.setMonth(0, 1 + ((4 - d.getDay()) + 7) % 7);
  }

  // The weeknumber is the number of weeks between the first Thursday of the year
  // and the Thursday in the target week
  return 1 + Math.ceil((firstThursday - d.valueOf()) / MILLISECONDS_IN_WEEK);
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
  let current = start;

  while (!current.equals(end)) {
    current = current.add(duration);
    days.push(current);
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
