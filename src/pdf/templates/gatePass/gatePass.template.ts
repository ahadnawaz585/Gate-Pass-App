import { TDocumentDefinitions } from "pdfmake/interfaces";
import { DetailedGatePass, Item } from "../../../types/paginatedData";
import { formatDate } from "../../../helper/date.helper";

export const generateGatePassTemplate = (
  data: DetailedGatePass,
  logoDataURL: string
): TDocumentDefinitions => {
  // Group details into logical sections for compact display
  const leftColumnDetails = [
    { label: "Customer", value: data.customername },
    { label: "Location", value: data.location },
    { label: "Vehicle No", value: data.vehicleNo },
    { label: "Store Incharge", value: data.storeIncharge }
  ];

  const rightColumnDetails = [
    { label: "Issued At", value: formatDate(data.issuedAt.toString()) },
    { label: "Valid Until", value: formatDate(data?.validUntil?.toString() || '') },
    { label: "Status", value: data.status },
    { label: "Notes", value: data.gatepassnotes || 'N/A' }
  ];

  // Create compact details layout
  const detailsRows = [];
  for (let i = 0; i < Math.max(leftColumnDetails.length, rightColumnDetails.length); i++) {
    const leftDetail = leftColumnDetails[i];
    const rightDetail = rightColumnDetails[i];
    
    detailsRows.push([
      leftDetail ? { text: leftDetail.label, style: "labelText" } : '',
      leftDetail ? { text: leftDetail.value, style: "valueText" } : '',
      rightDetail ? { text: rightDetail.label, style: "labelText" } : '',
      rightDetail ? { text: rightDetail.value, style: "valueText" } : ''
    ]);
  }

  // Create compact items table
  const itemsTableBody = [
    [
      { text: '#', style: 'tableHeader' },
      { text: 'Item Name', style: 'tableHeader' },
      { text: 'Qty', style: 'tableHeader' },
      { text: 'Serial Numbers', style: 'tableHeader' }
    ]
  ];

  data.items.forEach((item: Item, index: number) => {
    // Sort serial numbers efficiently
    const sortedSerialNos = [...item.serialNos].sort((a, b) => {
      const numA = parseInt(a, 10);
      const numB = parseInt(b, 10);
      return !isNaN(numA) && !isNaN(numB) ? numA - numB : 
             a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

    itemsTableBody.push([
      { text: (index + 1).toString(), style: 'tableCell' },
      { text: item.name, style: 'tableCell' },
      { text: item.quantity.toString(), style: 'tableCell' },
      { text: sortedSerialNos.join(", "), style: 'serialCell' }
    ]);
  });

  return {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 50],
    header: {
      columns: [
        { image: logoDataURL, width: 40, alignment: 'left', margin: [40, 20, 0, 0] },
        {
          stack: [
            { text: 'GATE PASS', style: 'documentTitle' },
            // { text: `GP-${data.id || 'XXXX'}`, style: 'documentNumber' }
          ],
          alignment: 'center',
          margin: [0, 15, 0, 0]
        },
        {
          stack: [
            { text: 'info@okashasmart.com', style: 'companyContact' },
            { text: '+92 300 1110888', style: 'companyContact' },
            { text: '59, Block J Johar Town, Lahore', style: 'companyContact' }
          ],
          alignment: 'right',
          margin: [0, 15, 40, 0]
        }
      ]
    },
    content: [
      // Compact details section
      {
        style: 'detailsTable',
        table: {
          widths: ['15%', '35%', '15%', '35%'],
          body: detailsRows
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#cccccc',
          vLineColor: () => '#cccccc',
          paddingTop: () => 4,
          paddingBottom: () => 4,
          paddingLeft: () => 6,
          paddingRight: () => 6
        },
        margin: [0, 20, 0, 15]
      },
      
      // Compact items section
      {
        style: 'itemsTable',
        table: {
          widths: ['8%', '35%', '12%', '45%'],
          body: itemsTableBody,
          headerRows: 1
        },
        layout: {
          hLineWidth: (i, node) => i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#333333',
          vLineColor: () => '#cccccc',
          fillColor: (rowIndex) => rowIndex === 0 ? '#f0f0f0' : (rowIndex % 2 === 0 ? '#fafafa' : null),
          paddingTop: () => 5,
          paddingBottom: () => 5,
          paddingLeft: () => 6,
          paddingRight: () => 6
        },
        margin: [0, 0, 0, 20]
      }
    ],
    footer: (currentPage, pageCount) => ({
      columns: [
        { text: `Generated: ${new Date().toLocaleDateString()}`, style: 'footerText', alignment: 'left' },
        { text: `Page ${currentPage} of ${pageCount}`, style: 'footerText', alignment: 'right' }
      ],
      margin: [40, 0, 40, 20]
    }),
    styles: {
      documentTitle: {
        fontSize: 16,
        bold: true,
        color: '#333333'
      },
      documentNumber: {
        fontSize: 12,
        color: '#666666',
        margin: [0, 2, 0, 0]
      },
      companyContact: {
        fontSize: 8,
        color: '#666666',
        margin: [0, 1, 0, 0]
      },
      labelText: {
        fontSize: 9,
        bold: true,
        color: '#333333'
      },
      valueText: {
        fontSize: 9,
        color: '#000000'
      },
      tableHeader: {
        fontSize: 10,
        bold: true,
        color: '#333333',
        alignment: 'center'
      },
      tableCell: {
        fontSize: 9,
        color: '#000000'
      },
      serialCell: {
        fontSize: 9,
        bold: true,
        color: '#000000'
      },
      footerText: {
        fontSize: 8,
        color: '#666666'
      },
      detailsTable: {
        margin: [0, 10, 0, 10]
      },
      itemsTable: {
        margin: [0, 0, 0, 10]
      }
    }
  };
};

export const styles = {
  header: {
    fontSize: 16,
    bold: true,
    alignment: "center",
    margin: [0, 0, 0, 10],
  },
  detailsText: {
    fontSize: 9,
    margin: [0, 1, 0, 1],
  },
  itemBox: {
    fontSize: 9,
    margin: [0, 2, 0, 2],
  },
};