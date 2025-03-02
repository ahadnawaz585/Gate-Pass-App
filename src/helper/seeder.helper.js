"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Excel = __importStar(require("exceljs"));
const path = require("path");
const staticData_1 = require("../static/staticData");
const customer_service_1 = __importDefault(require("../modules/app/customer/services/customer.service"));
const item_service_1 = __importDefault(require("../modules/app/item/services/item.service"));
const user_service_1 = __importDefault(require("../modules/rbac/user/service/user.service"));
const feature_service_1 = __importDefault(require("../modules/rbac/Features/service/feature.service"));
const base_model_1 = __importDefault(require("../core/models/base.model"));
class SeederHelper {
    constructor() {
        this.userService = new user_service_1.default();
        this.customerService = new customer_service_1.default();
        this.itemService = new item_service_1.default();
        this.appFeaturesService = new feature_service_1.default();
    }
    Seeder() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.gpCreateFeatures();
            // const filePath = path.join(__dirname, "/seeder/seeder.xlsx");
            // this.populateCustomer(filePath);
            // this.populateItem(filePath);
            this.gpCreateDefaultUser();
        });
    }
    gpCreateDefaultUser() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const user of staticData_1.defaultUser) {
                const existingUser = yield this.userService.getUserByUsername(user.username);
                if (!existingUser) {
                    yield this.userService.createUsers(user);
                    // await prisma.companyUsers.actCreate(userCompany);
                    console.log(`User ${user.username} created successfully.`);
                }
                else {
                    console.log(`User ${user.username} already exists. Skipping creation.`);
                }
            }
        });
    }
    gpCreateFeatures() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.appFeaturesService.getAllAppFeatures();
            if (data.length > 0) {
                console.log("skipping Features creation");
            }
            else {
                yield base_model_1.default.appFeature.gpCreate(staticData_1.features);
                console.log("Features created successfully.");
            }
        });
    }
    populateCustomer(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const workbook = new Excel.Workbook();
            let dataArray = [];
            try {
                yield workbook.xlsx.readFile(filePath);
                console.log("in Seeder", filePath);
                workbook.eachSheet((sheet, sheetId) => __awaiter(this, void 0, void 0, function* () {
                    if (sheet.name === "Customer") {
                        console.log(`Processing Sheet ${sheetId}: ${sheet.name}`);
                        const dataRows = sheet.getRows(2, sheet.rowCount) || [];
                        console.log(`Number of rows in sheet "${sheet.name}": ${dataRows.length}`);
                        dataArray = dataRows
                            .map((row, index) => {
                            var _a, _b, _c, _d, _e, _f;
                            const id = (_a = row.getCell("A")) === null || _a === void 0 ? void 0 : _a.value;
                            const name = (_b = row.getCell("B")) === null || _b === void 0 ? void 0 : _b.value;
                            const email = (_c = row.getCell("C")) === null || _c === void 0 ? void 0 : _c.value;
                            const phone = (_e = (_d = row.getCell("D")) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.toString();
                            const address = (_f = row.getCell("E")) === null || _f === void 0 ? void 0 : _f.value;
                            if (!id || !name) {
                                console.log(`ID or name is null in row ${index + 2}`);
                                return null; // Returning early from map function
                            }
                            // Check if all values are empty or null
                            const isEmptyRow = [id, name, email, phone, address].every((value) => value === null || value === undefined || value === "");
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
                        console.log(`Number of items to create in the database for sheet "${sheet.name}": ${dataArray.length}`);
                        yield this.customerService.createCustomer(dataArray);
                        console.log(`Database populated successfully from sheet "${sheet.name}".`);
                    }
                    else {
                        console.log(`Skipping sheet "${sheet.name}".`);
                    }
                }));
            }
            catch (error) {
                console.log("Error reading the workbook:", error);
                console.log("Problematic dataset:", dataArray);
            }
        });
    }
    populateItem(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const workbook = new Excel.Workbook();
            let dataArray = [];
            try {
                yield workbook.xlsx.readFile(filePath);
                console.log("in Seeder", filePath);
                workbook.eachSheet((sheet, sheetId) => __awaiter(this, void 0, void 0, function* () {
                    if (sheet.name === "Items") {
                        console.log(`Processing Sheet ${sheetId}: ${sheet.name}`);
                        const dataRows = sheet.getRows(2, sheet.rowCount) || [];
                        console.log(`Number of rows in sheet "${sheet.name}": ${dataRows.length}`);
                        dataArray = dataRows
                            .map((row, index) => {
                            var _a, _b, _c, _d, _e;
                            const id = (_a = row.getCell("A")) === null || _a === void 0 ? void 0 : _a.value;
                            const name = (_b = row.getCell("B")) === null || _b === void 0 ? void 0 : _b.value;
                            const description = (_c = row.getCell("C")) === null || _c === void 0 ? void 0 : _c.value;
                            const quantity = (_d = row.getCell("D")) === null || _d === void 0 ? void 0 : _d.value;
                            const unitPrice = (_e = row.getCell("E")) === null || _e === void 0 ? void 0 : _e.value;
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
                            ].every((value) => value === null || value === undefined || value === "");
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
                        console.log(`Number of items to create in the database for sheet "${sheet.name}": ${dataArray.length}`);
                        yield this.itemService.createItem(dataArray);
                        console.log(`Database populated successfully from sheet "${sheet.name}".`);
                    }
                    else {
                        console.log(`Skipping sheet "${sheet.name}".`);
                    }
                }));
            }
            catch (error) {
                console.log("Error reading the workbook:", error);
                console.log("Problematic dataset:", dataArray);
            }
        });
    }
}
exports.default = SeederHelper;
