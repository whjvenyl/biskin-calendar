import { expect } from '@open-wc/testing';
import { getWeekNumber } from './date';
import { PlainDate } from './temporal';

describe('weekOfYear', () => {
  it('returns the week number of given date', () => {
    expect(getWeekNumber(new PlainDate(2024, 4, 1))).to.eq(14);
    expect(getWeekNumber(new PlainDate(2024, 12, 31))).to.eq(1);
    expect(getWeekNumber(new PlainDate(2019, 12, 24))).to.eq(52);
    expect(getWeekNumber(new PlainDate(2019, 12, 31))).to.eq(1);
    expect(getWeekNumber(new PlainDate(2020, 1, 1))).to.eq(1);
    expect(getWeekNumber(new PlainDate(2020, 12, 24))).to.eq(52);
    expect(getWeekNumber(new PlainDate(2020, 12, 31))).to.eq(53);
    expect(getWeekNumber(new PlainDate(2021, 1, 1))).to.eq(53);
    expect(getWeekNumber(new PlainDate(2021, 1, 2))).to.eq(53);
    expect(getWeekNumber(new PlainDate(2021, 1, 3))).to.eq(53);
    expect(getWeekNumber(new PlainDate(2021, 1, 4))).to.eq(1);
    expect(getWeekNumber(new PlainDate(2021, 1, 5))).to.eq(1);
  });
});
