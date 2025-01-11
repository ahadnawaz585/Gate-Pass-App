"use strict";
// timeUtils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateTime = exports.formatTime = exports.formatDateWithExtraDay = exports.formatDate = void 0;
exports.getCurrentTimeInPST = getCurrentTimeInPST;
exports.convertToUTC = convertToUTC;
exports.convertToPST = convertToPST;
/**
 * Returns the current date and time in the Pakistan Standard Time (PST) time zone.
 * @returns {Date} A Date object with the current time in PST.
 */
function getCurrentTimeInPST() {
    const currentTimeInPST = new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" });
    return new Date(currentTimeInPST); // Convert the string back to a Date object
}
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
};
exports.formatDate = formatDate;
const formatDateWithExtraDay = (dateString) => {
    const date = new Date(dateString);
    // Add one day to the date
    date.setDate(date.getDate() + 1);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
};
exports.formatDateWithExtraDay = formatDateWithExtraDay;
const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Use 12-hour format
    };
    return date.toLocaleTimeString('en-GB', options); // Use toLocaleTimeString for time only
};
exports.formatTime = formatTime;
const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format
    };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
};
exports.formatDateTime = formatDateTime;
// Get the current time in PST (Pakistan Standard Time)
// Convert a date from a specific timezone to UTC
function convertToUTC(date) {
    return new Date(date.toISOString()); // Convert date to UTC by using ISO format
}
// Convert a UTC date to PST (assuming the system is using local timezone or handling conversion elsewhere)
function convertToPST(date) {
    return new Date(date.toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
}
