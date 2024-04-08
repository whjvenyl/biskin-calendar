import {expect} from '@open-wc/testing';
import {getWeekNumber} from './date';
import {PlainDate} from './temporal';

describe("weekOfYear", () => {
    it("returns the week number of given date", () => {
        expect(getWeekNumber(new PlainDate(2019, 11, 24))).to.eq(52);
        expect(getWeekNumber(new PlainDate(2019, 11, 31))).to.eq(1);
        expect(getWeekNumber(new PlainDate(2020, 0, 1))).to.eq(1);
        //expect(getWeekNumber(new PlainDate(2020, 11, 24))).to.eq(52);
        //expect(getWeekNumber(new PlainDate(2020, 11, 31))).to.eq(53);
        expect(getWeekNumber(new PlainDate(2021, 0, 3))).to.eq(53);
        expect(getWeekNumber(new PlainDate(2021, 0, 4))).to.eq(1);
    })
})
