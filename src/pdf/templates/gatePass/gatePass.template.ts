import { TDocumentDefinitions } from "pdfmake/interfaces";
import { DetailedGatePass, Item } from "../../../types/paginatedData";
import { formatDate } from "../../../helper/date.helper";

export const generateGatePassTemplate = (
  data: DetailedGatePass,
  logoDataURL: string
): TDocumentDefinitions => {
  const details: any[] = [];

  // Collecting gate pass details
  const detailFields = [
    { label: "Customer", value: data.customername },
    { label: "Issued At", value: formatDate(data.issuedAt.toString()) },
    { label: "Valid Until", value: formatDate(data?.validUntil?.toString() || '') },
    { label: "Status", value: data.status },
    { label: "Location", value: data.location },
    { label: "Vehicle No", value: data.vehicleNo },
    { label: "Store Incharge", value: data.storeIncharge },
    { label: "Notes", value: data.gatepassnotes }
  ];

  // Arrange details in three columns
  const detailsTableBody = [];
  for (let i = 0; i < detailFields.length; i += 3) {
    const row = [
      { text: `${detailFields[i].label}: ${detailFields[i].value}`, style: "detailsText" },
      { text: detailFields[i + 1] ? `${detailFields[i + 1].label}: ${detailFields[i + 1].value}` : '', style: "detailsText" },
      { text: detailFields[i + 2] ? `${detailFields[i + 2].label}: ${detailFields[i + 2].value}` : '', style: "detailsText" }
    ];
    detailsTableBody.push(row);
  }

  // Creating item blocks with enhanced styling
  const blocks: any[] = [];
  data.items.forEach((item: Item, index: number) => {
    blocks.push({
      stack: [
        { text: `${index + 1}. ${item.name}`, style: "itemName" },
        { text: `Quantity: ${item.quantity}`, style: "itemDetail" },
        { text: `Serial Numbers: ${item.serialNos.join(", ")}`, style: "serialNumberText" },
      ],
      margin: [0, 2, 0, 2],
      border: [false, false, false, true],
      fillColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff',
    });
  });

  return {
    header: { image: logoDataURL, width: 50, alignment: "center" },
    content: [
      {
        text: [
          { text: "info@okashasmart.com | ", style: "contactInfo" },
          { text: "+92 300 1110888 | ", style: "contactInfo" },
          { text: "59, Block J Johar Town, Lahore, 54782", style: "contactInfo" },
        ],
        alignment: "center",
        margin: [0, 10, 0, 10],
      },
      {
        text: 'Customer Information',
        style: 'sectionHeader',
        margin: [0, 10, 0, 5],
      },
      {
        style: "detailsContainer",
        table: {
          widths: ['33%', '33%', '33%'],
          body: detailsTableBody
        },
        layout: 'noBorders'
      },
      {
        text: 'Items',
        style: 'sectionHeader',
        margin: [0, 10, 0, 5],
      },
      {
        style: "itemsContainer",
        table: {
          widths: ['*'],
          body: blocks.map(block => [{ stack: block.stack, fillColor: block.fillColor }])
        },
        layout: 'noBorders'
      }
    ],
    footer: (currentPage, pageCount) => ({
      text: `${currentPage} of ${pageCount}`,
      alignment: "center",
      margin: [0, 0, 0, 10],
    }),
    styles: {
      headerTitle: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 10, 0, 10]
      },
      sectionHeader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      detailsText: { 
        fontSize: 10,
        margin: [0, 0, 0, 0]
      },
      detailsContainer: { 
        margin: [0, 10, 0, 10] 
      },
      itemsContainer: {
        margin: [0, 10, 0, 10]
      },
      itemName: { 
        bold: true,
        fontSize: 12
      },
      itemDetail: {
        fontSize: 10
      },
      serialNumberText: {
        fontSize: 8
      },
      contactInfo: {
        fontSize: 9
      },
    },
  };
};