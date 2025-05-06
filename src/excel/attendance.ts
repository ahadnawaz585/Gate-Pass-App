import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';

export class AttendanceExcelUtility {
  async create(attendanceData: any[]): Promise<{ wbout: Buffer; fileName: string }> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance');

    // Define column headers
    worksheet.columns = [
      { header: 'Employee Name', key: 'fullName', width: 25 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Check In', key: 'checkIn', width: 15 },
      { header: 'Check Out', key: 'checkOut', width: 15 },
      { header: 'Employee Code', key: 'code', width: 20 },
    ];

    // Add data rows
    attendanceData.forEach((record) => {
      worksheet.addRow({
        fullName: `${record.employeeName} ${record.employeeSurname}`,
        date: record.date ? new Date(record.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        }) : '',
        checkIn: record.checkIn ? new Date(record.checkIn).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }) : '',
        checkOut: record.checkOut ? new Date(record.checkOut).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }) : '',
        code: record.code || '',
      });
    });

    // Style header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD3D3D3' }
    };

    // Auto-filter for headers
    worksheet.autoFilter = {
      from: 'A1',
      to: { row: 1, column: worksheet.columns.length }
    };

    // Write workbook to buffer
    const wbout = await workbook.xlsx.writeBuffer() as Buffer;

    // Format current date and time as DD-MMM-YYYY-HHMM
    const currentDateTime = new Date().toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/, /g, '-').replace(/ /g, '-').replace(/:/g, '');

    return {
      wbout,
      fileName: `Attendance-${currentDateTime}.xlsx`,
    };
  }
}