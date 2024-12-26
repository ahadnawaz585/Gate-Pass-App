import { TDocumentDefinitions } from "pdfmake/interfaces";
import pdfMake from "pdfmake/build/pdfmake";
import { fonts } from "./config/pdf-fonts";
import { generateEmployeeTemplate } from "./templates/employee/employee.template";
import { DetailedGatePass } from "../types/paginatedData";
import { getLogoDataURL } from "./helper/logo.helper"
import { Employee } from "../modules/AMS/Employee/types/employee";

const pdfFonts = require("./config/custom-fonts");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export class EmployeePDF {
  constructor() {
    (pdfMake as any).fonts = fonts;
  }

  public generateEmployeePDF(data: Employee): any {
    const logoDataURL = getLogoDataURL("./src/assets/images/Power-Highway-Logo.png");
    const docDefinition: TDocumentDefinitions = generateEmployeeTemplate(data, logoDataURL);
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    return pdfDocGenerator;
  }
}
