import fs from "fs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { DetailedGatePass, Item } from "../types/paginatedData";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class GatePassPDF {
  public generateGatePassPDF(data: DetailedGatePass): any {
    const okashaSmartLogo = "./src/assets/images/Okahsa-Smart-Logo.png";
    const solarMaxLogo = "./src/assets/images/SolarMax-logo.png";
    const okashaSmartLogoBuffer = fs.readFileSync(okashaSmartLogo);
    const solarMaxLogoBuffer = fs.readFileSync(solarMaxLogo);
    const okashaSmartImageDataURL = `data:image/png;base64,${okashaSmartLogoBuffer.toString(
      "base64"
    )}`;
    const solarMaxImageDataURL = `data:image/png;base64,${solarMaxLogoBuffer.toString(
      "base64"
    )}`;

    const details: any[] = [];

    if (data.customername)
      details.push({
        text: `Customer: ${data.customername}`,
        style: "detailsText",
      });
    if (data.issuedAt)
      details.push({
        text: `Issued At: ${new Date(data.issuedAt).toLocaleString()}`,
        style: "detailsText",
      });
    if (data.validUntil)
      details.push({
        text: `Valid Until: ${new Date(data.validUntil).toLocaleString()}`,
        style: "detailsText",
      });
    if (data.status)
      details.push({ text: `Status: ${data.status}`, style: "detailsText" });
    if (data.location)
      details.push({
        text: `Location: ${data.location}`,
        style: "detailsText",
      });
    if (data.vehicleNo)
      details.push({
        text: `Vehicle No: ${data.vehicleNo}`,
        style: "detailsText",
      });
    if (data.storeIncharge)
      details.push({
        text: `Store Incharge: ${data.storeIncharge}`,
        style: "detailsText",
      });
    if (data.gatepassnotes)
      details.push({
        text: `Notes: ${data.gatepassnotes}`,
        style: "detailsText",
      });

    // Group details into rows of three items each
    const groupedDetails: any[] = [];
    for (let i = 0; i < details.length; i += 3) {
      groupedDetails.push({
        columns: [details[i] || {}, details[i + 1] || {}, details[i + 2] || {}],
      });
    }

    // Generate item details and serial numbers hierarchy
    const serialNumbersTables: any[] = [];
    data.items.forEach((item: Item, index: number) => {
      const itemDetails: any[] = [
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 0,
              x2: 515,
              y2: 0,
              lineWidth: 2,
              lineColor: "#1a73e8",
            },
          ],
          margin: [0, 10, 0, 10],
        },
        {
          text: `${index + 1}. ${item.name}`,
          style: "itemName",
          margin: [5, 5, 5, 10],
        },
        {
          columns: [
            {
              width: "25%",
              text: `Quantity: ${item.quantity}`,
              style: "itemDetail",
            },
            {
              width: "25%",
              text: `Unit Price: ${item.unitPrice}`,
              style: "itemDetail",
            },
            {
              width: "*",
              text: `Description: ${item.description}`,
              style: "itemDetail",
            },
          ],
          margin: [5, 5, 5, 5],
        },
        {
          table: {
            widths: ["*"],
            body: [
              [{ text: "Serial Numbers:", style: "serialNumberHeader" }],
              ...item.serialNos.map((serialNo: string) => [{ text: serialNo }]),
            ],
          },
          layout: "lightHorizontalLines",
          style: "serialNumbersTable",
          margin: [5, 0, 5, 5],
        },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 0,
              x2: 515,
              y2: 0,
              lineWidth: 2,
              lineColor: "#1a73e8",
            },
          ],
          margin: [0, 10, 0, 10],
        },
      ];

      serialNumbersTables.push({
        stack: itemDetails,
        style: "itemBox",
      });
    });

    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          columns: [
            { image: okashaSmartImageDataURL, width: 80, alignment: "left" },
            {
              text: "",
              style: "verticalLine",
              alignment: "left",
              margin: [10, 0, 10, 0],
            },
            { image: solarMaxImageDataURL, width: 80, alignment: "left" },
          ],
        },
        // {
        //   canvas: [
        //     {
        //       type: "line",
        //       x1: 0,
        //       y1: 0,
        //       x2: 515,
        //       y2: 0,
        //       lineWidth: 1,
        //       lineColor: "#1a73e8",
        //     },
        //   ],
        // },
        {
          text: [
            { text: "info@okashasmart.com | ", style: "contactInfo" },
            { text: "+92 300 1110888 | ", style: "contactInfo" },
            {
              text: "59, Block J Johar Town, Lahore, 54782 ",
              style: "contactInfo",
            },
          ],
          alignment: "center",
          margin: [0, 10, 0, 10],
        },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 0,
              x2: 515,
              y2: 0,
              lineWidth: 1,
              lineColor: "#1a73e8",
            },
          ],
        },
        {
          text: "Gate Pass",
          style: "header",
          alignment: "center",
          margin: [0, 10, 0, 10],
        },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 0,
              x2: 515,
              y2: 0,
              lineWidth: 1,
              lineColor: "#1a73e8",
            },
          ],
        },
        {
          style: "detailsContainer",
          stack: groupedDetails,
          margin: [0, 10, 0, 10],
        },
        // {
        //   canvas: [
        //     {
        //       type: "line",
        //       x1: 0,
        //       y1: 0,
        //       x2: 515,
        //       y2: 0,
        //       lineWidth: 1,
        //       lineColor: "#1a73e8",
        //     },
        //   ],
        // },
        // {
        //   text: "Details",
        //   style: "header",
        //   alignment: "center",
        //   margin: [0, 10, 0, 10],
        // },
        ...serialNumbersTables,
        // {
        //   canvas: [
        //     {
        //       type: "line",
        //       x1: 0,
        //       y1: 0,
        //       x2: 515,
        //       y2: 0,
        //       lineWidth: 1,
        //       lineColor: "#1a73e8",
        //     },
        //   ],
        //   margin: [0, 10, 0, 10],
        // },
      ],
      footer: function (currentPage, pageCount) {
        return {
          text: currentPage.toString() + " of " + pageCount,
          alignment: "center",
          margin: [0, 0, 0, 10],
        };
      },
      styles: {
        header: {
          fontSize: 18,
          color: "Black",
          italics: true,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        detailsText: {
          fontSize: 12,
          margin: [0, 2, 0, 2],
        },
        verticalLine: {
          fontSize: 18,
          bold: true,
        },
        detailsContainer: {
          margin: [0, 10, 0, 10],
        },
        itemName: {
          bold: true,
          color: "#1a73e8",
          margin: [0, 5, 0, 5],
        },
        itemDetail: {
          margin: [5, 5, 5, 5],
        },
        serialNumbersTable: {
          margin: [0, 5, 0, 10],
        },
        itemBox: {
          margin: [0, 10, 0, 10],
          fillColor: "#F0F0F0",
        },
        serialNumberHeader: {
          bold: true,
          margin: [0, 5, 0, 5],
          color: "#1a73e8",
        },
        color: {
          color: "#1a73e8",
        },
        contactInfo: {
          alignment: "left",
          fontSize: 12,
          // margin: [0, 5, 0, 5],
        },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    return pdfDocGenerator;
  }
}
