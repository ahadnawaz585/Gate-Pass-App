import * as Excel from "exceljs";
const path = require("path");
import CustomerService from "../modules/app/customer/services/customer.service";
import ItemService from "../modules/app/item/services/item.service";

class SeederHelper {
  private customerService: CustomerService;
  private itemService: ItemService;

  constructor() {
    this.customerService = new CustomerService();
    this.itemService = new ItemService();
  }

  async Seeder(): Promise<any> {
    const filePath = path.join(__dirname, "/seeder/seeder.xlsx");
    this.populateCustomer(filePath);
    this.populateItem(filePath);
  }

  private async populateCustomer(filePath: string) {
    const workbook = new Excel.Workbook();
    let dataArray: any = [];

    try {
      await workbook.xlsx.readFile(filePath);
      console.log("in Seeder", filePath);

      workbook.eachSheet(async (sheet, sheetId) => {
        if (sheet.name === "Customer") {
          console.log(`Processing Sheet ${sheetId}: ${sheet.name}`);
          const dataRows = sheet.getRows(2, sheet.rowCount) || [];

          console.log(
            `Number of rows in sheet "${sheet.name}": ${dataRows.length}`
          );

          dataArray = dataRows
            .map((row, index) => {
              const id = row.getCell("A")?.value;
              const name = row.getCell("B")?.value;
              const email = row.getCell("C")?.value;
              const phone = row.getCell("D")?.value?.toString();
              const address = row.getCell("E")?.value;

              if (!id || !name) {
                console.log(`ID or name is null in row ${index + 2}`);
                return null; // Returning early from map function
              }

              // Check if all values are empty or null
              const isEmptyRow = [id, name, email, phone, address].every(
                (value) => value === null || value === undefined || value === ""
              );

              if (isEmptyRow) {
                console.log(`Row ${index + 2} is empty or null`);
              }

              return {
                id,
                name,
                email,
                phone,
                address,
              };
            })
            .filter((item) => item !== null);

          console.log(
            `Number of items to create in the database for sheet "${sheet.name}": ${dataArray.length}`
          );

          await this.customerService.createCustomer(dataArray);
          console.log(
            `Database populated successfully from sheet "${sheet.name}".`
          );
        } else {
          console.log(`Skipping sheet "${sheet.name}".`);
        }
      });
    } catch (error) {
      console.log("Error reading the workbook:", error);
      console.log("Problematic dataset:", dataArray);
    }
  }

  private async populateItem(filePath: string) {
    const workbook = new Excel.Workbook();
    let dataArray: any = [];

    try {
      await workbook.xlsx.readFile(filePath);
      console.log("in Seeder", filePath);

      workbook.eachSheet(async (sheet, sheetId) => {
        if (sheet.name === "Items") {
          console.log(`Processing Sheet ${sheetId}: ${sheet.name}`);
          const dataRows = sheet.getRows(2, sheet.rowCount) || [];

          console.log(
            `Number of rows in sheet "${sheet.name}": ${dataRows.length}`
          );

          dataArray = dataRows
            .map((row, index) => {
              const id = row.getCell("A")?.value;
              const name = row.getCell("B")?.value;
              const description = row.getCell("C")?.value;
              const quantity = row.getCell("D")?.value;
              const unitPrice = row.getCell("E")?.value;

              if (!id || !name) {
                console.log(`ID or name is null in row ${index + 2}`);
                return null; // Returning early from map function
              }

              // Check if all values are empty or null
              const isEmptyRow = [
                id,
                name,
                description,
                quantity,
                unitPrice,
              ].every(
                (value) => value === null || value === undefined || value === ""
              );

              if (isEmptyRow) {
                console.log(`Row ${index + 2} is empty or null`);
              }

              return {
                id,
                name,
                description,
                quantity,
                unitPrice,
              };
            })
            .filter((item) => item !== null);

          console.log(
            `Number of items to create in the database for sheet "${sheet.name}": ${dataArray.length}`
          );

          await this.itemService.createItem(dataArray);
          console.log(
            `Database populated successfully from sheet "${sheet.name}".`
          );
        } else {
          console.log(`Skipping sheet "${sheet.name}".`);
        }
      });
    } catch (error) {
      console.log("Error reading the workbook:", error);
      console.log("Problematic dataset:", dataArray);
    }
  }
}

export default SeederHelper;
