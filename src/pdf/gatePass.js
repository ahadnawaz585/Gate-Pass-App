"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatePassPDF = void 0;
const fs_1 = __importDefault(require("fs"));
const pdfmake_1 = __importDefault(require("pdfmake/build/pdfmake"));
const date_helper_1 = require("../helper/date.helper");
const pdf_fonts_1 = require("./config/pdf-fonts");
const pdfFonts = require('./config/custom-fonts');
// import * from "../assets/images/Power-Highway-Logo.png"
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
pdfmake_1.default.vfs = pdfFonts.pdfMake.vfs;
class GatePassPDF {
    constructor() {
        pdfmake_1.default.fonts = pdf_fonts_1.fonts;
    }
    generateGatePassPDF(data) {
        const powerHighwayLogo = "./src/assets/i  mages/Power-Highway-Logo.png";
        const powerHighwayLogoBuffer = fs_1.default.readFileSync(powerHighwayLogo);
        const PowerHighwayImageDataURL = `data:image/png;base64,${powerHighwayLogoBuffer.toString("base64")}`;
        // console.log(PowerHighwayImageDataURL);
        const details = [];
        if (data.customername)
            details.push({
                text: `Customer: ${data.customername}`,
                style: "detailsText",
            });
        if (data.issuedAt)
            details.push({
                text: `Issued At: ${(0, date_helper_1.formatDate)(new Date(data.issuedAt).toLocaleString())}`,
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
        const groupedDetails = [];
        for (let i = 0; i < details.length; i += 3) {
            groupedDetails.push({
                columns: [details[i] || {}, details[i + 1] || {}, details[i + 2] || {}],
            });
        }
        const blocks = [];
        const blockSize = 5;
        for (let i = 0; i < data.items.length; i += blockSize) {
            const itemsBlock = data.items.slice(i, i + blockSize).map((item, index) => {
                // Group serial numbers in lines for better readability
                const serialNos = item.serialNos.reduce((acc, serialNo, idx) => {
                    const groupIndex = Math.floor(idx / 10);
                    acc[groupIndex] = acc[groupIndex] || [];
                    acc[groupIndex].push(serialNo);
                    return acc;
                }, []).map((group) => group.join(", ")).join("\n");
                return [
                    {
                        text: `${i + index + 1}. ${item.name}`,
                        style: "itemName",
                        margin: [0, 0, 0, 0],
                    },
                    {
                        columns: [
                            {
                                width: "25%",
                                text: `Quantity: ${item.quantity}`,
                                style: "itemDetail",
                            },
                        ],
                        margin: [0, 5, 0, 0],
                    },
                    {
                        text: `Serial Numbers:\n${serialNos}`,
                        style: "serialNumberText",
                        margin: [0, 0],
                        width: 515, // Adjust this width based on your page layout
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
                                lineColor: "#CCCCCC",
                            },
                        ],
                        margin: [0, 10, 0, 10],
                    },
                ];
            });
            blocks.push({
                stack: itemsBlock,
                style: "itemBox",
                margin: [0, 10, 0, 10],
            });
        }
        const docDefinition = {
            header: {
                columns: [
                    { image: PowerHighwayImageDataURL, width: 50, height: 50, alignment: "center", margin: [0, 0, 0, 0] },
                ],
                margin: [20, 0, 0, 0]
            },
            content: [
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
                    style: "detailsContainer",
                    stack: groupedDetails,
                    margin: [0, 10, 0, 10],
                },
                ...blocks,
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
                    fontSize: 10,
                    margin: [0, 2, 0, 2],
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
                    fontSize: 9,
                    lineHeight: 1.2,
                    margin: [0, 0, 0, 0],
                },
                serialNumberText: {
                    margin: [0, 0],
                    fontSize: 8,
                    lineHeight: 1.2,
                },
                itemBox: {
                    margin: [0, 0, 0, 0],
                    fillColor: "#F7F7F7",
                },
                contactInfo: {
                    alignment: "left",
                    fontSize: 10,
                },
            },
        };
        const pdfDocGenerator = pdfmake_1.default.createPdf(docDefinition);
        return pdfDocGenerator;
    }
}
exports.GatePassPDF = GatePassPDF;
function constructer() {
    throw new Error("Function not implemented.");
}
