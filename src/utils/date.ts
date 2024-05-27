import { PlainDate, type PlainYearMonth } from "./temporal.js";

export type DaysOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function today() {
  return PlainDate.from(new Date());
}

export function startOfWeek(
  date: PlainDate,
  firstDayOfWeek: DaysOfWeek = 0
): PlainDate {
  const d = toDate(date);
  const day = d.getUTCDay();
  const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;

  d.setUTCDate(d.getUTCDate() - diff);
  return PlainDate.from(d);
}

export function getWeekNumber(date: PlainDate): number {
  const MILLISECONDS_IN_WEEK = 604800000

  const d = toDate(date);
  const day = d.getUTCDay();

  /* ISO week date weeks start on Monday, so correct the day number */
  const dayNum = (day + 6) % 7;

  /* Set the target to the nearest Thursday (current date + 4 - current day number) */
  d.setDate(d.getDate() - dayNum + 3);

  /* ISO 8601 week number of the year for this date */
  const firstThursday = d.valueOf();

  /* Set the target to the first day of the year - First set the target to January 1st */
  d.setMonth(0, 1);

  /* If this is not a Thursday, set the target to the next Thursday */
  if (d.getDay() !== 4) {
    d.setMonth(0, 1 + ((4 - d.getDay()) + 7) % 7);
  }

  /* The weeknumber is the number of weeks between the first Thursday of the year and the Thursday in the target week */
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

/**
 * Ensures date is within range, returns min or max if out of bounds
 */
export function clamp(
  date: PlainDate,
  min?: PlainDate,
  max?: PlainDate
): PlainDate {
  if (min && PlainDate.compare(date, min) < 0) return min;
  if (max && PlainDate.compare(date, max) > 0) return max;
  return date;
}

const oneDay = { days: 1 };

/**
 * given a date, return an array of dates from a calendar perspective
 */
export function getViewOfMonth(
  yearMonth: PlainYearMonth,
  firstDayOfWeek: DaysOfWeek = 0
): PlainDate[][] {
  let start = startOfWeek(yearMonth.toPlainDate(), firstDayOfWeek);
  const end = endOfWeek(endOfMonth(yearMonth), firstDayOfWeek);

  const weeks: PlainDate[][] = [];

  // get all days in range
  while (PlainDate.compare(start, end) < 0) {
    const week = [];

    // chunk into weeks
    for (let i = 0; i < 7; i++) {
      week.push(start);
      start = start.add(oneDay);
    }

    weeks.push(week);
  }

  return weeks;
}

interface DateLike {
  year: number;
  month: number;
  day?: number;
}

export function toDate(date: DateLike): Date {
  return new Date(Date.UTC(date.year, date.month - 1, date.day ?? 1));
}
