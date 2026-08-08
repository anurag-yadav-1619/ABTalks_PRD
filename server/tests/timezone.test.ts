import { describe, it, expect } from 'vitest';
import { getDayDifferenceInTimezone } from '../src/utils/timezone';
import { addDays, subDays } from 'date-fns';

describe('Timezone & Streak Utilities', () => {
  it('calculates day differences correctly in timezone', () => {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const yesterday = subDays(today, 1);
    
    // Test timezone day diff calculations
    expect(getDayDifferenceInTimezone(tomorrow, today)).toBe(1);
    expect(getDayDifferenceInTimezone(today, yesterday)).toBe(1);
    expect(getDayDifferenceInTimezone(today, today)).toBe(0);
  });
});
