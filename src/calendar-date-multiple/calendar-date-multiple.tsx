import { c, useEffect, type Host } from 'atomico';
import { PlainDate } from '../utils/temporal.js';
import { useDateMultipleProp, useDateProp, useDateRangeProp } from '../utils/hooks.js';
import { CalendarBase, styles, props } from '../calendar-base/calendar-base.js';
import { useCalendarBase } from '../calendar-base/useCalendarBase.js';

export const CalendarDateMultiple = c(
  (props): Host<{ onChange: Event; onFocusDay: CustomEvent<Date> }> => {
    const [value, setValue] = useDateMultipleProp('value');
    const calendar = useCalendarBase(props);

    useEffect(() => {
      if (value.length) {
        calendar.setFocusedDate(value[value.length - 1]);
      }
    }, [value]);

    function handleSelect(e: CustomEvent<PlainDate>) {
      const selectedDate = e.detail;
      if (value?.some(date => date.equals(selectedDate))) {
        // Remove the date from the selectedDates array
        setValue((value.filter(date => !date.equals(selectedDate))));
      } else {
          // Add the date to the selectedDates array and sort them
          const newValue = [...(value || []), selectedDate];
          newValue.sort(PlainDate.compare);
          setValue(newValue);
      }
      calendar.dispatch();
    }

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
