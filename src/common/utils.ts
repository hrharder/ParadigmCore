/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name utils.ts
 * @module common
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  26-February-2019
 * @date (modified) 26-February-2019
*/

/**
 * Convert an ISO date-time string to UNIX timestamp.
 *
 * @param dateTime an ISO-8601 date-time string to be converted to unix time
 */
export function convertIsoTimeToUnixMs(dateTime: string): number {
    const date = new Date(dateTime);
    const dateMs = date.getTime();
    const timestamp = Math.floor(dateMs);
    return timestamp;
}
