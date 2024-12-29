"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateTime = exports.formatTime = exports.formatDate = void 0;
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
};
exports.formatDate = formatDate;
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
