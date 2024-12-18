"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// import { tableNames } from "../static/staticData";
const basePrisma = new client_1.PrismaClient({
// log: ["query"],
});
const prisma = basePrisma.$extends({
    model: {
        $allModels: {
            gpSoftDelete(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const existingItem = yield this.findUnique({ where: { id } });
                    if (existingItem.isDeleted === null) {
                        yield this.update({
                            where: { id },
                            data: { isDeleted: new Date() },
                        });
                    }
                });
            },
            gpRestore(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const existingItem = yield this.findUnique({ where: { id } });
                    if (existingItem.isDeleted !== null) {
                        yield this.update({
                            where: { id },
                            data: { isDeleted: null },
                        });
                    }
                });
            },
            gpSearch(searchTerm_1, columns_1) {
                return __awaiter(this, arguments, void 0, function* (searchTerm, columns, pageNumber = 1, pageSize = 10) {
                    const searchTermsArray = Array.isArray(searchTerm)
                        ? searchTerm
                        : [searchTerm];
                    let mainCondition = {};
                    for (let i = 0; i < searchTermsArray.length; i++) {
                        const term = searchTermsArray[i];
                        const condition = {
                            OR: columns.map((column) => ({
                                [column]: {
                                    mode: "insensitive",
                                    contains: term,
                                },
                            })),
                        };
                        if (i === 0) {
                            mainCondition = condition;
                        }
                        else {
                            mainCondition = {
                                AND: [mainCondition, condition],
                            };
                        }
                    }
                    const offset = (pageNumber - 1) * pageSize;
                    const [data, totalSize] = yield Promise.all([
                        this.findMany({
                            where: Object.assign({ isDeleted: null }, mainCondition),
                            skip: offset,
                            take: pageSize,
                        }),
                        this.count({
                            where: Object.assign({ isDeleted: null }, mainCondition),
                        }),
                    ]);
                    return { data, totalSize };
                });
            },
            gpCreate(createdData) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!Array.isArray(createdData)) {
                        createdData = [createdData];
                    }
                    const createdItems = [];
                    for (const data of createdData) {
                        let newData = Object.assign(Object.assign({}, data), { createdAt: new Date() });
                        const createdItem = yield this.create({
                            data: newData,
                        });
                        createdItems.push(createdItem);
                    }
                    return createdItems;
                });
            },
            gpUpdate(updateId, updatedData) {
                return __awaiter(this, void 0, void 0, function* () {
                    let newData = Object.assign(Object.assign({}, updatedData), { updatedAt: new Date() });
                    const updatedItem = yield this.update({
                        where: { id: updateId },
                        data: newData,
                    });
                    return updatedItem;
                });
            },
            gpFindById(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const data = yield this.findUnique({
                        where: {
                            id: id,
                            isDeleted: null,
                        },
                    });
                    return data;
                });
            },
            gpCount() {
                return __awaiter(this, void 0, void 0, function* () {
                    const count = yield this.count({
                        where: {
                            isDeleted: null,
                        },
                    });
                    return count;
                });
            },
            gpPgFindMany(page, pageSize) {
                return __awaiter(this, void 0, void 0, function* () {
                    const skip = (page - 1) * pageSize;
                    // console.log(page,pageSize);
                    const data = yield this.findMany({
                        where: {
                            isDeleted: null,
                        },
                        take: pageSize,
                        skip: skip,
                    });
                    const totalSize = yield this.count({
                        where: {
                            isDeleted: null,
                        },
                    });
                    return { data, totalSize };
                });
            },
            gpPgFindDeletedMany(page, pageSize) {
                return __awaiter(this, void 0, void 0, function* () {
                    const skip = (page - 1) * pageSize;
                    const data = yield this.findMany({
                        where: {
                            isDeleted: {
                                not: null,
                            },
                        },
                        // take: pageSize,
                        // skip: skip,
                    });
                    const totalSize = yield this.count({
                        where: {
                            isDeleted: {
                                not: null,
                            },
                        },
                    });
                    return { data, totalSize };
                });
            },
            gpFindMany() {
                return __awaiter(this, void 0, void 0, function* () {
                    const data = yield this.findMany({
                        where: {
                            isDeleted: null,
                        },
                    });
                    return data;
                });
            },
            gpFilter(searchTerm_1, columns_1) {
                return __awaiter(this, arguments, void 0, function* (searchTerm, columns, pageNumber = 1, pageSize = 10) {
                    const searchTermsArray = Array.isArray(searchTerm)
                        ? searchTerm
                        : [searchTerm];
                    const searchConditions = searchTermsArray.map((term) => ({
                        OR: columns.map((column) => ({
                            [column]: { equals: term },
                        })),
                    }));
                    const [data, totalSize] = yield Promise.all([
                        this.findMany({
                            where: {
                                isDeleted: null,
                                OR: searchConditions,
                            },
                            skip: (pageNumber - 1) * pageSize,
                            take: pageSize,
                        }),
                        this.count({
                            where: {
                                isDeleted: null,
                                OR: searchConditions,
                            },
                        }),
                    ]);
                    return { data, totalSize };
                });
            },
            gpGetByName(name) {
                return __awaiter(this, void 0, void 0, function* () {
                    const Data = yield this.findFirst({
                        where: {
                            name: name,
                            isDeleted: null,
                        },
                    });
                    return Data;
                });
            },
            gpUpdateByName(updateId, updatedData) {
                return __awaiter(this, void 0, void 0, function* () {
                    let newData = Object.assign(Object.assign({}, updatedData), { updatedAt: new Date() });
                    const updatedItem = yield this.update({
                        where: { name: updateId },
                        data: newData,
                    });
                    return updatedItem;
                });
            },
        },
    },
});
exports.default = prisma;
