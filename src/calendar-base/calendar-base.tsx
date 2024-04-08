import { css } from "atomico";
import {
  CalendarMonthContext,
  type CalendarDateContext,
  type CalendarRangeContext,
  type CalendarDateMultipleContext,
} from "../calendar-month/CalendarMonthContext.js";
import { reset, vh } from "../utils/styles.js";
import type { DaysOfWeek } from "../utils/date.js";
import type { PlainDate } from "../utils/temporal.js";

interface CalendarBaseProps {
  format: Intl.DateTimeFormat;
  formatVerbose: Intl.DateTimeFormat;
  previous?: () => void;
  next?: () => void;
  onSelect: (e: CustomEvent<PlainDate>) => void;
  onFocus: (e: CustomEvent<PlainDate>) => void;
  onHover?: (e: CustomEvent<PlainDate>) => void;
}

interface CalendarRangeProps extends CalendarBaseProps, CalendarRangeContext {}
interface CalendarDateProps extends CalendarBaseProps, CalendarDateContext {}
interface CalendarDateMultipleProps extends CalendarBaseProps, CalendarDateMultipleContext {}

export function CalendarBase(props: CalendarDateProps | CalendarRangeProps | CalendarDateMultipleProps) {
  const start = props.dateWindow.start.toDate();
  const end = props.dateWindow.end.toDate();

  return (
    <div role="group" aria-labelledby="label" part="container">
      <div id="label" class="vh" aria-live="polite" aria-atomic="true">
        {props.formatVerbose.formatRange(start, end)}
      </div>

      <div class="header" part="header">
        {props.disableNavigation ? null : (
          <button
            part={`button previous ${props.previous ? "" : "disabled"}`}
            onclick={props.previous}
            aria-disabled={props.previous ? null : "true"}
          >
            <slot name="previous">Previous</slot>
          </button>
        )}

        <div id="heading" part="heading" aria-hidden="true">
          {props.format.formatRange(start, end)}
        </div>

        {props.disableNavigation ? null : (
          <button
            part={`button next ${props.next ? "" : "disabled"}`}
            onclick={props.next}
            aria-disabled={props.next ? null : "true"}
          >
            <slot name="next">Next</slot>
          </button>
        )}
      </div>

      <CalendarMonthContext
        value={props}
        onselectday={props.onSelect}
        onfocusday={props.onFocus}
        onhoverday={props.onHover}
      >
        <slot></slot>
      </CalendarMonthContext>
    </div>
  );
}

export const props = {
  value: {
    type: String,
    value: "",
  },
  readonly: {
    type: Boolean,
    value: (): boolean => false,
  },
  min: {
    type: String,
    value: "",
  },
  max: {
    type: String,
    value: "",
  },
  isDateDisallowed: {
    type: Function,
    value: (date: Date) => false,
  },
  firstDayOfWeek: {
    type: Number,
    value: (): DaysOfWeek => 1,
  },
  showOutsideDays: {
    type: Boolean,
    value: (): boolean => false,
  },
  showWeekNumbers: {
    type: Boolean,
    value: (): boolean => false,
  },
  formatWeekNumbers: {
    type: Function,
    value: (weekNumber: number) => `W${weekNumber}`,
  },
  locale: {
    type: String,
    value: (): string | undefined => undefined,
  },
  months: {
    type: Number,
    value: 1,
  },
  disableNavigation: {
    type: Boolean,
    value: (): boolean => false,
  }
};

export const styles = [
  reset,
  vh,
  css`
    :host {
      display: block;
      inline-size: fit-content;
    }

    [role="group"] {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    #heading {
      font-weight: bold;
      font-size: 1.25em;
      margin: auto;
    }

    button {
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button[aria-disabled] {
      cursor: default;
      opacity: 0.4;
    }
  `,
];
