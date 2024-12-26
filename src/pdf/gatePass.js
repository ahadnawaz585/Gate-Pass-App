"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatePassPDF = void 0;
const pdfmake_1 = __importDefault(require("pdfmake/build/pdfmake"));
const pdf_fonts_1 = require("./config/pdf-fonts");
const gatePass_template_1 = require("./templates/gatePass/gatePass.template");
const logo_helper_1 = require("./helper/logo.helper");
const pdfFonts = require("./config/custom-fonts");
pdfmake_1.default.vfs = pdfFonts.pdfMake.vfs;
class GatePassPDF {
    constructor() {
        pdfmake_1.default.fonts = pdf_fonts_1.fonts;
    }
    generateGatePassPDF(data) {
        const logoDataURL = (0, logo_helper_1.getLogoDataURL)("./src/assets/images/Power-Highway-Logo.png");
        const docDefinition = (0, gatePass_template_1.generateGatePassTemplate)(data, logoDataURL);
        const pdfDocGenerator = pdfmake_1.default.createPdf(docDefinition);
        return pdfDocGenerator;
    }
}
exports.GatePassPDF = GatePassPDF;
