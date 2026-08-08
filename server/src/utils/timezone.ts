import { toDate, formatInTimeZone, toZonedTime, fromZonedTime } from 'date-fns-tz';
import { startOfDay, differenceInDays } from 'date-fns';

const CHALLENGE_TIMEZONE = process.env.CHALLENGE_TIMEZONE || 'Asia/Kolkata';

export function getNowInChallengeTimezone(): Date {
  return new Date();
}

/**
 * Normalizes a UTC date to the start of the day in the challenge timezone,
 * returning a Date object that represents midnight in that timezone.
 */
export function getStartOfDayInTimezone(date: Date | string | number): Date {
  const dateObj = new Date(date);
  const zonedDate = toZonedTime(dateObj, CHALLENGE_TIMEZONE);
  const startOfZonedDay = startOfDay(zonedDate);
  return fromZonedTime(startOfZonedDay, CHALLENGE_TIMEZONE);
}

/**
 * Calculates the difference in calendar days between two dates
 * according to the challenge timezone.
 */
export function getDayDifferenceInTimezone(laterDate: Date, earlierDate: Date): number {
  const laterStart = getStartOfDayInTimezone(laterDate);
  const earlierStart = getStartOfDayInTimezone(earlierDate);
  return differenceInDays(laterStart, earlierStart);
}
