import { TDocumentDefinitions, Content } from "pdfmake/interfaces";

export const generateAttendanceTemplate = (
  data: any[],
  logoDataURL: string,
  companyName: string = "Quick Pass",
  department: string = "All Departments",
  period: string = "Current Period"
): TDocumentDefinitions => {
  // Calculate statistics
  const totalEmployees = new Set(data.map(record => record.code)).size;
  const totalRecords = data.length;
  const averageHoursPerDay = calculateAverageHours(data);
  
  // Group by date to show attendance trends
  const dateGroups = groupByDate(data);
  const dateLabels = Object.keys(dateGroups);
  const attendanceCounts = dateLabels.map(date => dateGroups[date].length);

  // Create table body with improved styling
  const tableBody: any[] = [
    [
      { text: '#', style: 'tableHeader', alignment: 'center', width: 25 },
      { text: 'EMPLOYEE', style: 'tableHeader' },
      { text: 'DATE', style: 'tableHeader', alignment: 'center' },
      { text: 'IN', style: 'tableHeader', alignment: 'center' },
      { text: 'OUT', style: 'tableHeader', alignment: 'center' },
      { text: 'HRS', style: 'tableHeader', alignment: 'center' },
      { text: 'CODE', style: 'tableHeader', alignment: 'center' },
    ],
  ];

  data.forEach((record, index) => {
    const checkInTime = record.checkIn ? new Date(record.checkIn) : null;
    const checkOutTime = record.checkOut ? new Date(record.checkOut) : null;
    
    let hoursWorked = '-';
    if (checkInTime && checkOutTime) {
      const diff = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
      hoursWorked = diff.toFixed(1);
    }
    
    tableBody.push([
      {
        text: (index + 1).toString(),
        style: 'tableCell',
        alignment: 'center'
      },
      {
        text: `${record.employeeName} ${record.employeeSurname}`,
        style: 'tableCell'
      },
      {
        text: record.date ? new Date(record.date).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit'
        }) : '-',
        style: 'tableCell',
        alignment: 'center'
      },
      {
        text: checkInTime ? checkInTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }) : '-',
        style: 'tableCell',
        alignment: 'center'
      },
      {
        text: checkOutTime ? checkOutTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }) : '-',
        style: 'tableCell',
        alignment: 'center'
      },
      {
        text: hoursWorked,
        style: 'tableCell',
        alignment: 'center'
      },
      {
        text: record.code || '-',
        style: 'tableCell',
        alignment: 'center'
      },
    ]);
  });

  // Create document content
  const content: Content = [
    // Compact header with logo and company info
    {
      columns: [
        {
          image: logoDataURL,
          width: 60,
          alignment: 'left',
        },
        {
          stack: [
            { text: companyName, style: 'companyName' },
            { text: 'Attendance Management System', style: 'subheader' },
          ],
          alignment: 'right',
        }
      ],
      margin: [0, 0, 0, 10]
    },
    
    // Report title and metadata in more compact form
    {
      stack: [
        { text: 'ATTENDANCE REPORT', style: 'reportTitle' },
        {
          columns: [
            {
              width: 'auto',
              text: [

              ]
            },
            {
              width: 'auto',
              text: [

              ]
            },
            {
              width: '*',
              text: [
                { text: 'Generated: ', style: 'metadataLabel' },
                { 
                  text: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                  }),
                  style: 'metadataValue'
                }
              ],
              alignment: 'right'
            }
          ],
          columnGap: 5,
        }
      ],
      margin: [0, 0, 0, 10]
    },
    
    // Main attendance table - more compact
    {
      table: {
        headerRows: 1,
        widths: [25, '*', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: tableBody,
      },
      layout: {
        fillColor: (rowIndex: number) => {
          if (rowIndex === 0) return '#2C3E50';
          return rowIndex % 2 === 0 ? '#F8F9FA' : null;
        },
        hLineWidth: (i: number, node: any) => {
          if (i === 0 || i === 1 || i === node.table.body.length) return 0.75;
          return 0.5;
        },
        vLineWidth: () => 0,
        hLineColor: (i: number) => i === 1 ? '#2C3E50' : '#E9ECEF',
        paddingLeft: () => 5,
        paddingRight: () => 5,
        paddingTop: () => 5,
        paddingBottom: () => 5,
      },
      margin: [0, 0, 0, 15]
    },
    
    // Stats cards displayed at the bottom
    {
      columns: [
        {
          stack: [
            {
              table: {
                widths: ['*'],
                body: [
                  [
                    {
                      stack: [
                        { text: totalEmployees.toString(), style: 'statNumber', alignment: 'center' },
                        { text: 'Total Employees', style: 'statLabel', alignment: 'center' }
                      ]
                    }
                  ]
                ]
              },
              layout: {
                fillColor: () => '#F1F8FF',
                hLineWidth: () => 1,
                vLineWidth: () => 1,
                hLineColor: () => '#D0E3FF',
                vLineColor: () => '#D0E3FF',
                paddingLeft: () => 10,
                paddingRight: () => 10,
                paddingTop: () => 15,
                paddingBottom: () => 15,
              }
            }
          ],
          width: '*'
        },
        {
          stack: [
            {
              table: {
                widths: ['*'],
                body: [
                  [
                    {
                      stack: [
                        { text: totalRecords.toString(), style: 'statNumber', alignment: 'center' },
                        { text: 'Total Records', style: 'statLabel', alignment: 'center' }
                      ]
                    }
                  ]
                ]
              },
              layout: {
                fillColor: () => '#F0FFF4',
                hLineWidth: () => 1,
                vLineWidth: () => 1,
                hLineColor: () => '#C6F6D5',
                vLineColor: () => '#C6F6D5',
                paddingLeft: () => 10,
                paddingRight: () => 10,
                paddingTop: () => 15,
                paddingBottom: () => 15,
              }
            }
          ],
          width: '*'
        },
        {
          stack: [
            {
              table: {
                widths: ['*'],
                body: [
                  [
                    {
                      stack: [
                        { text: `${averageHoursPerDay}h`, style: 'statNumber', alignment: 'center' },
                        { text: 'Avg Hours/Day', style: 'statLabel', alignment: 'center' }
                      ]
                    }
                  ]
                ]
              },
              layout: {
                fillColor: () => '#FFF5F5',
                hLineWidth: () => 1,
                vLineWidth: () => 1,
                hLineColor: () => '#FED7D7',
                vLineColor: () => '#FED7D7',
                paddingLeft: () => 10,
                paddingRight: () => 10,
                paddingTop: () => 15,
                paddingBottom: () => 15,
              }
            }
          ],
          width: '*'
        }
      ],
      columnGap: 10,
      margin: [0, 0, 0, 15]
    },
    
    // Footer with summary and signature
    {
      columns: [
        {
          width: '*',
          text: `Report ID: ${generateReportId()}`,
          style: 'footer',
          alignment: 'left',
        },
        {
          width: '*',
          stack: [
            { text: '____________________________', alignment: 'center' },
            { text: 'Authorized Signature', style: 'signatureLabel', alignment: 'center' }
          ],
        }
      ],
      columnGap: 10,
      margin: [0, 20, 0, 0]
    },
  ];

  return {
    pageSize: 'A4',
    pageMargins: [30, 30, 30, 45],
    content,
    footer: (currentPage: number, pageCount: number) => {
      return {
        columns: [
          { text: 'Confidential Document', alignment: 'left', style: 'pageFooter' },
          { text: `Page ${currentPage} of ${pageCount}`, alignment: 'right', style: 'pageFooter' }
        ],
        margin: [30, 0]
      };
    },
    styles: {
      companyName: {
        fontSize: 14,
        bold: true,
        color: '#2C3E50',
      },
      subheader: {
        fontSize: 10,
        color: '#7F8C8D',
        italics: true,
      },
      reportTitle: {
        fontSize: 16,
        bold: true,
        color: '#2C3E50',
        alignment: 'center',
        margin: [0, 0, 0, 5],
      },
      metadataLabel: {
        fontSize: 9,
        bold: true,
        color: '#7F8C8D',
      },
      metadataValue: {
        fontSize: 9,
        color: '#2C3E50',
      },
      statNumber: {
        fontSize: 18,
        bold: true,
        color: '#2C3E50',
      },
      statLabel: {
        fontSize: 9,
        color: '#7F8C8D',
      },
      tableHeader: {
        bold: true,
        fontSize: 9,
        color: '#FFFFFF',
        fillColor: '#2C3E50',
      },
      tableCell: {
        fontSize: 9,
        color: '#2C3E50',
        lineHeight: 1.1,
      },
      footer: {
        fontSize: 8,
        color: '#7F8C8D',
      },
      signatureLabel: {
        fontSize: 9,
        color: '#7F8C8D',
        margin: [0, 3, 0, 0],
      },
      pageFooter: {
        fontSize: 7,
        color: '#95A5A6',
        italics: true,
      }
    },
    defaultStyle: {
      fontSize: 9,
      color: '#2C3E50',
    },
  };
};

// Helper functions
function calculateAverageHours(data: any[]): string {
  let totalHours = 0;
  let validRecords = 0;
  
  data.forEach(record => {
    if (record.checkIn && record.checkOut) {
      const checkInTime = new Date(record.checkIn);
      const checkOutTime = new Date(record.checkOut);
      const hours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
      
      if (hours > 0 && hours < 24) { // Filter out potentially erroneous records
        totalHours += hours;
        validRecords++;
      }
    }
  });
  
  return validRecords > 0 ? (totalHours / validRecords).toFixed(1) : "0.0";
}

function groupByDate(data: any[]): Record<string, any[]> {
  const groups: Record<string, any[]> = {};
  
  data.forEach(record => {
    if (record.date) {
      const dateKey = new Date(record.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      });
      
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      
      groups[dateKey].push(record);
    }
  });
  
  return groups;
}

function generateReportId(): string {
  return `REP-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
}