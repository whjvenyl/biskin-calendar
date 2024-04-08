import { c, useEffect, type Host } from 'atomico';
import { PlainDate } from '../utils/temporal.js';
import { useDateMultipleProp } from '../utils/hooks.js';
import { CalendarBase, styles, props } from '../calendar-base/calendar-base.js';
import { useCalendarBase } from '../calendar-base/useCalendarBase.js';

export const CalendarDateMultiple = c(
  (props): Host<{ onChange: Event; onFocusDay: CustomEvent<Date> }> => {
    const [value, setValue] = useDateMultipleProp('value');
    const calendar = useCalendarBase(props);

    function handleSelect(e: CustomEvent<PlainDate>) {
      const selectedDate = e.detail;
      if (value?.some(date => date.equals(selectedDate))) {
        /* Remove the date from the selectedDates array */
        setValue(value.filter(date => !date.equals(selectedDate)));
      } else {
        /* Add the date to the selectedDates array and sort them */
        const newValue = [...(value || []), selectedDate];
        newValue.sort(PlainDate.compare);
        setValue(newValue);
      }
      calendar.dispatch();
    }

    /*
     * Instead of setting the focus to the last date in the selectedDates array, we do nothing.
     * This avoids the strange behavior of the calendar jumping seemingly randomly when selecting or deselecting dates.
     */
    useEffect(() => {
        /* empty */
    }, [value]);

    return (
      <host shadowDom focus={calendar.focus}>
        <CalendarBase
          {...props}
          {...calendar}
          selectedDates={value}
          onFocus={calendar.handleFocus}
          onSelect={handleSelect}
        />
      </host>
    );
  },

  { props, styles }
);

customElements.define('calendar-date-multiple', CalendarDateMultiple);
