import { c, css, useContext, useRef, type Host } from 'atomico';
import { reset, vh } from '../utils/styles.js';
import { useCalendarMonth } from './useCalendarMonth.js';
import { CalendarMonthContext } from './CalendarMonthContext.js';
import { getWeekNumber, toDate } from '../utils/date';

export const CalendarMonth = c(
  (
    props
  ): Host<{
    onSelectDay: CustomEvent<string>;
    onFocusDay: CustomEvent<string>;
    onHoverDay: CustomEvent<string>;
  }> => {
    const context = useContext(CalendarMonthContext);
    const table = useRef<HTMLTableElement>();
    const calendar = useCalendarMonth({ props, context });

    function focus() {
      table.current.querySelector<HTMLElement>("button[tabindex='0']")?.focus();
    }

    return (
      <host shadowDom focus={focus}>
        <div id="h" part="heading">
          {calendar.formatter.format(toDate(calendar.yearMonth))}
        </div>

        <table ref={table} aria-labelledby="h" part="table">
          <thead>
            <tr part="tr head">
              {context.showWeekNumbers && (
                <th part="th" scope="col">
                  <span class="vh" aria-hidden="true" />
                </th>
              )}
              {calendar.daysLong.map((dayName, i) => (
                <th part="th" scope="col">
                  <span class="vh">{dayName}</span>
                  <span aria-hidden="true">{calendar.daysShort[i]}</span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {calendar.weeks.map((week, i) => (
              <tr key={i} part="tr week">
                {context.showWeekNumbers && week[0] && (
                  <td class="weeknumber" part="td weeknumber">
                    {context.formatWeekNumbers ? context.formatWeekNumbers(getWeekNumber(week[0])) : week[0]}
                  </td>
                )}
                {week.map((date, j) => {
                  const withinMonth = calendar.yearMonth.equals(date);
                  const showDay = context.showOutsideDays || withinMonth;

                  return (
                    <td part="td" key={j}>
                      {showDay && <button {...calendar.getDayProps(date)}>{date.day}</button>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </host>
    );
  },

  {
    props: {
      offset: {
        type: Number,
        value: 0,
      },
    },

    styles: [
      reset,
      vh,
      css`
        :host {
          --color-accent: black;
          --color-text-on-accent: white;

          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          text-align: center;
          inline-size: fit-content;
        }

        table {
          border-collapse: collapse;
          border-spacing: 0;
          table-layout: fixed;
          inline-size: max-content;
          font-size: 0.875rem;
        }

        th {
          font-weight: bold;
          block-size: 2.25rem;
          min-width: 36px;
        }

        td {
          padding-inline: 0;
          padding-block: 1px;
          min-width: 36px;
        }
        
        td.weeknumber {
          font-size: 0.875em;
        }

        button {
          color: inherit;
          font-size: inherit;
          background: transparent;
          border: 0;
          cursor: pointer;
          font-variant-numeric: tabular-nums;
          block-size: 2.25rem;
          inline-size: 2.25rem;
        }

        button:hover:where(:not(:disabled, [aria-disabled])) {
          background: #0000000d;
        }

        button:is([aria-pressed="true"], :focus-visible) {
          background: var(--color-accent);
          color: var(--color-text-on-accent);
        }

        button:focus-visible {
          outline: 1px solid var(--color-text-on-accent);
          outline-offset: -2px;
        }

        button:disabled,
        :host::part(outside),
        :host::part(disallowed) {
          cursor: default;
          opacity: 0.5;
        }

        :host::part(disallowed) {
          text-decoration: line-through;
        }
      `
    ]
  }
);
customElements.define('calendar-month', CalendarMonth);
