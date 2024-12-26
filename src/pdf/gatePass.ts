import { TDocumentDefinitions } from "pdfmake/interfaces";
import pdfMake from "pdfmake/build/pdfmake";
import { fonts } from "./config/pdf-fonts";
import { generateGatePassTemplate } from "./templates/gatePass/gatePass.template";
import { DetailedGatePass } from "../types/paginatedData";
import { getLogoDataURL } from "./helper/logo.helper"

const pdfFonts = require("./config/custom-fonts");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export class GatePassPDF {
  constructor() {
    (pdfMake as any).fonts = fonts;
  }

  public generateGatePassPDF(data: DetailedGatePass): any {
    const logoDataURL = getLogoDataURL("./src/assets/images/Power-Highway-Logo.png");
    const docDefinition: TDocumentDefinitions = generateGatePassTemplate(data, logoDataURL);
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    return pdfDocGenerator;
  }
}
