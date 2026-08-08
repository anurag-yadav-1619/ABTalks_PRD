"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const timezone_1 = require("../src/utils/timezone");
const date_fns_1 = require("date-fns");
(0, vitest_1.describe)('Timezone & Streak Utilities', () => {
    (0, vitest_1.it)('calculates day differences correctly in timezone', () => {
        const today = new Date();
        const tomorrow = (0, date_fns_1.addDays)(today, 1);
        const yesterday = (0, date_fns_1.subDays)(today, 1);
        // Test timezone day diff calculations
        (0, vitest_1.expect)((0, timezone_1.getDayDifferenceInTimezone)(tomorrow, today)).toBe(1);
        (0, vitest_1.expect)((0, timezone_1.getDayDifferenceInTimezone)(today, yesterday)).toBe(1);
        (0, vitest_1.expect)((0, timezone_1.getDayDifferenceInTimezone)(today, today)).toBe(0);
    });
});
