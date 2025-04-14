import { Request, Response } from "express";
import BaseController from "../../../../core/controllers/base.controller";
import EmployeeService from "../services/employee.service";
import { Employee } from "../types/employee";
import path from "path";
import { EmployeePDF } from "../../../../pdf/employee";
import { EmployeeExcelUtility } from "../../../../excel/employee";
class EmployeeController extends BaseController<EmployeeService> {
  protected service = new EmployeeService();
  private pdfUtility: EmployeePDF = new EmployeePDF();
  private excelUtility = new EmployeeExcelUtility();

  async getAllEmployees(req: Request, res: Response) {
    const param = req.query.filter as string;

    const operation = async () => {
      if (param) {
        console.log(`Query parameter provided: ${param}`);
        return await this.service.getFilterEmployees();
      } else {
        console.log("No query parameter provided.");
        return await this.service.getAllEmployees();
      }
    };

    const successMessage = "Employees retrieved successfully!";
    const errorMessage = "Error retrieving employees:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async deleteFiles(req: Request, res: Response) {
    const { employeeId, fileName } = req.body;

    if (!employeeId || !fileName) {
      return res
        .status(400)
        .json({ message: "Employee ID and file name are required" });
    }

    let operation = async () => {
      await this.service.deleteFiles(employeeId, fileName);
    };

    let successMessage = "File deleted successfully!";
    let errorMessage = "Error deleting file:";
    await this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getEmployeeExcel(req: Request, res: Response): Promise<void> {
    const data = await this.service.getAllEmployees();
    const result = await this.excelUtility.create(data);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${result.fileName}"`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(result.wbout); // Ensure this is binary data (e.g., a Buffer or equivalent)
  }

 async getEmployeeByUserId(req: Request, res: Response) {
    const { userId } = req.body;
    let successMessage = "Files retrieved successfully!";
    let errorMessage = "Error retrieving files:";
    const operation = () => this.service.getEmployeeByUserId(userId);
    await this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getEmployeeCard(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const data: Employee | null = await this.service.getEmployeeById(id);
      if (data) {
        const pdfDoc = this.pdfUtility.generateEmployeePDF(data);

        pdfDoc.getBuffer((buffer: Buffer) => {
          if (buffer) {
            res.writeHead(200, {
              "Content-Type": "application/pdf",
              "Content-Disposition": `attachment; filename=${encodeURIComponent(
                data.name
              )}.pdf`,
              "Content-Length": buffer.length,
            });
            res.end(buffer);
          } else {
            res.status(500).json({ error: "Error generating PDF buffer" });
          }
        });
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getFiles(req: Request, res: Response) {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    let operation = async () => {
      return await this.service.getFiles(employeeId);
    };

    let successMessage = "Files retrieved successfully!";
    let errorMessage = "Error retrieving files:";
    await this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async updateFiles(req: Request, res: Response) {
    const { employeeId, employeeName } = req.body;

    if (!employeeId || !employeeName) {
      return res
        .status(400)
        .json({ message: "Employee ID and Name are required" });
    }

    try {
      let files: any = req.files as Express.Multer.File[]; // Array of uploaded files
      // console.log(files.files);
      files = files.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      // Get existing file paths from the employee
      const employee: any = await this.service.getEmployeeById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      const existingFilePaths = employee.filePaths || [];

      // Create new file paths
      const newFilePaths = files.map((file: any) => {
        // Extract the relative path for the structured folder
        const relativePath = path.relative(
          path.join(__dirname, "..", "..", "..", "..", "assets"),
          file.path
        );

        // Ensure forward slashes in the path
        const normalizedPath = relativePath.replace(/\\+/g, "/");

        return normalizedPath;
      });

      // Update the employee with the new file paths
      const updatedFilePaths = [...existingFilePaths, ...newFilePaths];
      await this.service.updateFilePaths(employeeId, updatedFilePaths);

      return res
        .status(200)
        .json({ message: "Files uploaded and employee updated successfully" });
    } catch (error) {
      console.error("Error uploading files for employee:", error);
      return res.status(500).json({ message: "Error uploading files" });
    }
  }

  async uploadFiles(req: Request, res: Response) {
    const employeeId = req.body.employeeId;
    if (!employeeId) {
      return res.status(400).json({ message: "employee ID is required" });
    }
  }

  async getEmployees(req: Request, res: Response) {
    const { page, pageSize } = req.body;
    const operation = () => this.service.getEmployees(page, pageSize);
    const successMessage = "Employees retrieved successfully!";
    const errorMessage = "Error retrieving employees:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getDeletedEmployees(req: Request, res: Response) {
    const { page, pageSize } = req.body;
    const operation = () => this.service.getDeletedEmployees(page, pageSize);
    const successMessage = "Deleted employees retrieved successfully!";
    const errorMessage = "Error retrieving deleted employees:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async searchEmployees(req: Request, res: Response) {
    const { searchTerm, page, pageSize } = req.body;
    const operation = () =>
      this.service.searchEmployee(searchTerm, page, pageSize);
    const successMessage = "Employees retrieved successfully!";
    const errorMessage = "Error retrieving employees:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getTotalEmployees(req: Request, res: Response) {
    const operation = () => this.service.getTotalEmployees();
    const successMessage = "Total employees count retrieved successfully!";
    const errorMessage = "Error retrieving total employees count:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async createEmployee(req: Request, res: Response) {
    const employeeData: Employee = req.body;

    const operation = () => this.service.createEmployee(employeeData);
    const successMessage = "Employee created successfully!";
    const errorMessage = "Error creating employee:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async updateEmployee(req: Request, res: Response) {
    const { id, data } = req.body;
    const operation = () => this.service.updateEmployee(id, data);
    const successMessage = "Employee updated successfully!";
    const errorMessage = "Error updating employee:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async deleteEmployee(req: Request, res: Response) {
    const { id } = req.body;
    const operation = () => this.service.deleteEmployee(id);
    const successMessage = "Employee deleted successfully!";
    const errorMessage = "Error deleting employee:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getEmployeeById(req: Request, res: Response) {
    const { id } = req.body;
    const operation = () => this.service.getEmployeeById(id);
    const successMessage = "Employee retrieved successfully!";
    const errorMessage = "Error retrieving employee:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getEmployeeByCode(req: Request, res: Response) {
    const { code } = req.body;
    const operation = () => this.service.getEmployeeByCode(code);
    const successMessage = "Employee retrieved successfully!";
    const errorMessage = "Error retrieving employee:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async restoreEmployee(req: Request, res: Response) {
    const { id } = req.body;
    const operation = () => this.service.restoreEmployee(id);
    const successMessage = "Employee restored successfully!";
    const errorMessage = "Error restoring employee:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }
}

export default EmployeeController;
