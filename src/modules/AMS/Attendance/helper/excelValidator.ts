import * as XLSX from 'xlsx';
import { AttendanceStatus } from '@prisma/client';

interface ValidationResult {
  isValid: boolean;
  message: string;
  data: any[];
}

class ExcelValidator {
  private expectedHeaders: string[] = ['date', 'status', 'checkIn', 'checkOut'];
  private validStatuses: string[] = Object.values(AttendanceStatus);

  // Utility function to convert Excel date-time to HH:mm format
  private convertExcelTimeToHHMM(excelDate: Date): string {
    // Convert the Excel date to Pakistan Standard Time (UTC+5)
    const offsetMinutes = 5 * 60; // UTC+5 in minutes
    const localDate = new Date(excelDate.getTime() + offsetMinutes * 60 * 1000);
    const hours = localDate.getUTCHours().toString().padStart(2, '0');
    const minutes = localDate.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Utility function to combine date and time into an ISO string (in UTC)
  private combineDateAndTime(date: Date, time: string | null): string | null {
    if (!time) return null;
    const [hours, minutes] = time.split(':').map(Number);
    // Create a new Date object based on the provided date
    const combinedDate = new Date(date);
    // Reset time to 00:00:00 UTC
    combinedDate.setUTCHours(0, 0, 0, 0);
    // Set the hours and minutes in Pakistan Standard Time (UTC+5)
    // Since the time (e.g., 10:00) is in Pakistan Standard Time, we need to convert it to UTC
    // 10:00 in UTC+5 is 05:00 in UTC
    const utcHours = (hours - 5 + 24) % 24; // Subtract 5 hours to convert from UTC+5 to UTC
    combinedDate.setUTCHours(utcHours, minutes, 0, 0);
    // If the UTC time rolls back to the previous day, adjust the date
    if (utcHours > hours) {
      combinedDate.setUTCDate(combinedDate.getUTCDate() - 1);
    }
    return combinedDate.toISOString();
  }

  async validateExcel(file: Buffer, employeeId: string, month: string): Promise<ValidationResult> {
    try {
      console.log('File Buffer:', file);
      console.log('File Buffer Length:', file?.length);

      if (!file || file.length === 0) {
        return {
          isValid: false,
          message: 'File buffer is empty or undefined.',
          data: [],
        };
      }

      const workbook = XLSX.read(file, { type: 'buffer', cellDates: true });
      if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
        return {
          isValid: false,
          message: 'Excel file contains no sheets.',
          data: [],
        };
      }

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      if (!worksheet) {
        return {
          isValid: false,
          message: 'Unable to read the first sheet in the Excel file.',
          data: [],
        };
      }

      // Parse the sheet with dateNF to format time cells as HH:mm
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
        defval: '',
        blankrows: false,
        raw: false,
        dateNF: 'HH:mm', // Format time cells as HH:mm
      });
      console.log('Parsed Excel Data:', jsonData);

      if (!jsonData || jsonData.length === 0) {
        return {
          isValid: false,
          message: 'Excel file is empty or contains no valid data rows.',
          data: [],
        };
      }

      // Normalize headers: convert to lowercase and remove spaces
      const headers = Object.keys(jsonData[0]).map(header => header.toLowerCase().replace(/\s/g, ''));
      const expectedNormalizedHeaders = this.expectedHeaders.map(header => header.toLowerCase().replace(/\s/g, ''));
      const missingHeaders = expectedNormalizedHeaders.filter(header => !headers.includes(header));
      if (missingHeaders.length > 0) {
        return {
          isValid: false,
          message: `Missing required headers: ${missingHeaders.join(', ')}.`,
          data: [],
        };
      }

      const validMonths = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      if (!validMonths.includes(month)) {
        return {
          isValid: false,
          message: `Invalid month: ${month}. Must be a valid month name (e.g., January).`,
          data: [],
        };
      }

      if (!employeeId || typeof employeeId !== 'string') {
        return {
          isValid: false,
          message: 'Invalid employeeId: Must be a non-empty string.',
          data: [],
        };
      }

      const year = new Date().getFullYear();
      const monthIndex = validMonths.indexOf(month);

      // Determine the number of days in the specified month
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

      const validatedData: any[] = [];
      for (const [index, row] of jsonData.entries()) {
        const normalizedRow: any = {};
        Object.keys(row).forEach(key => {
          normalizedRow[key.toLowerCase().replace(/\s/g, '')] = row[key];
        });

        const day = parseInt(normalizedRow.date, 10);
        if (isNaN(day) || day < 1 || day > daysInMonth) {
          console.log(`Stopping at row ${index + 2}: Invalid or out-of-range day (${day}) for ${month}. ${month} ${year} has ${daysInMonth} days.`);
          break;
        }

        // Create the base date in UTC
        const date = new Date(Date.UTC(year, monthIndex, day));
        // Apply the 9-hour offset to the date (in UTC)
        date.setUTCHours(9, 0, 0, 0);

        if (isNaN(date.getTime())) {
          return {
            isValid: false,
            message: `Invalid date at row ${index + 2}: ${normalizedRow.date}.`,
            data: [],
          };
        }

        const rowMonth = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
        if (rowMonth !== month) {
          return {
            isValid: false,
            message: `Date at row ${index + 2} (${date.toISOString()}) does not match the specified month (${month}).`,
            data: [],
          };
        }

        if (!this.validStatuses.includes(normalizedRow.status)) {
          return {
            isValid: false,
            message: `Invalid status at row ${index + 2}: ${normalizedRow.status}. Must be one of ${this.validStatuses.join(', ')}.`,
            data: [],
          };
        }

        // Handle checkIn and checkOut based on status
        let checkInTime: string | null;
        let checkOutTime: string | null;

        // If status is ABSENT or ON_LEAVE, set checkIn and checkOut to null without validation
        if (normalizedRow.status === 'ABSENT' || normalizedRow.status === 'ON_LEAVE') {
          checkInTime = null;
          checkOutTime = null;
        } else {
          // Otherwise, proceed with parsing and validation
          // Normalize checkIn: set to null if empty, undefined, or only whitespace
          const rawCheckIn = normalizedRow.checkin;
          if (!rawCheckIn || rawCheckIn === '' || (typeof rawCheckIn === 'string' && rawCheckIn.trim() === '')) {
            checkInTime = null;
          } else if (rawCheckIn instanceof Date) {
            // If parsed as a Date, convert to HH:mm
            checkInTime = this.convertExcelTimeToHHMM(rawCheckIn);
          } else {
            checkInTime = rawCheckIn.toString().trim();
          }

          // Normalize checkOut: set to null if empty, undefined, or only whitespace
          const rawCheckOut = normalizedRow.checkout;
          if (!rawCheckOut || rawCheckOut === '' || (typeof rawCheckOut === 'string' && rawCheckOut.trim() === '')) {
            checkOutTime = null;
          } else if (rawCheckOut instanceof Date) {
            // If parsed as a Date, convert to HH:mm
            checkOutTime = this.convertExcelTimeToHHMM(rawCheckOut);
          } else {
            checkOutTime = rawCheckOut.toString().trim();
          }

          // Validate times only if they are not null
          const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
          if (checkInTime !== null && !timeRegex.test(checkInTime)) {
            return {
              isValid: false,
              message: `Invalid checkIn time at row ${index + 2}: ${checkInTime}. Must be in HH:mm format.`,
              data: [],
            };
          }
          if (checkOutTime !== null && !timeRegex.test(checkOutTime)) {
            return {
              isValid: false,
              message: `Invalid checkOut time at row ${index + 2}: ${checkOutTime}. Must be in HH:mm format.`,
              data: [],
            };
          }
        }

        // Combine date with checkIn and checkOut times to create ISO strings
        const checkInISO = this.combineDateAndTime(date, checkInTime);
        const checkOutISO = this.combineDateAndTime(date, checkOutTime);

        validatedData.push({
          employeeId: employeeId,
          date: date.toISOString(),
          status: normalizedRow.status,
          checkIn: checkInISO,
          checkOut: checkOutISO,
        });
      }

      if (validatedData.length === 0) {
        return {
          isValid: false,
          message: 'No valid data rows found within the expected date range.',
          data: [],
        };
      }

      return {
        isValid: true,
        message: 'Excel file validated successfully.',
        data: validatedData,
      };
    } catch (error) {
      console.error('Excel Validation Error:', error);
      return {
        isValid: false,
        message: `Error processing Excel file: ${(error as Error).message}`,
        data: [],
      };
    }
  }
}

export default ExcelValidator;