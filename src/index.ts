import { CalendarMonth } from './calendar-month/calendar-month';
import { CalendarDate } from './calendar-date/calendar-date';
import { CalendarRange } from './calendar-range/calendar-range';
import { CalendarDateMultiple } from './calendar-date-multiple/calendar-date-multiple';
export { CalendarMonth, CalendarDate, CalendarRange, CalendarDateMultiple };

import type { AtomicoThis } from 'atomico/types/dom.js';

type Simplify<T> = {
  [K in keyof T]: T[K];
} & {};

type ComponentProps<T extends abstract new (...args: any) => any> = Simplify<
  Partial<Omit<InstanceType<T>, keyof HTMLElement | keyof AtomicoThis>>
>;

// export props for use in react/vue/etc
export type CalendarMonthProps = ComponentProps<typeof CalendarMonth>;
export type CalendarDateProps = ComponentProps<typeof CalendarDate>;
export type CalendarDateMultipleProps = ComponentProps<typeof CalendarDateMultiple>;
export type CalendarRangeProps = ComponentProps<typeof CalendarRange>;
