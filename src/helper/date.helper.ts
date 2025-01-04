// timeUtils.ts

/**
 * Returns the current date and time in the Pakistan Standard Time (PST) time zone.
 * @returns {Date} A Date object with the current time in PST.
 */
export function getCurrentTimeInPST(): Date {
    const currentTimeInPST = new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" });
    return new Date(currentTimeInPST); // Convert the string back to a Date object
  }
  
  
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric',  month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
};

export const formatDateWithExtraDay = (dateString: string) => {
    const date = new Date(dateString);
    // Add one day to the date
    date.setDate(date.getDate() + 1);
    
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
};


export const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Use 12-hour format
    };
    return date.toLocaleTimeString('en-GB', options); // Use toLocaleTimeString for time only
  };

  
export const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
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

