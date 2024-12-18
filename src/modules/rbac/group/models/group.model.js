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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = __importDefault(require("../../../../core/models/base.model"));
const groupModel = base_model_1.default.$extends({
    model: {
        group: {
            gpSoftDelete(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const existingItem = yield this.findUnique({ where: { id } });
                    if (existingItem.isDeleted === null) {
                        yield this.update({
                            where: { id },
                            data: { isDeleted: new Date() },
                        });
                    }
                    yield base_model_1.default.groupRole.deleteMany({
                        where: {
                            groupId: id,
                        },
                    });
                    yield base_model_1.default.groupRole.deleteMany({
                        where: {
                            groupId: id,
                        },
                    });
                });
            },
            gpCreate(data) {
                return __awaiter(this, void 0, void 0, function* () {
                    //   const rules: BusinessRule[] =
                    //     await businessRuleModel.businessRule.actFindByFeatureId(
                    //       "ca.create.*"
                    //     );
                    //   const readAccess = rules[0].operation.readAccess;
                    //   const writeAccess = rules[0].operation.writeAccess;
                    let newData = {
                        name: data.name,
                        createdAt: new Date(),
                        // readAccess: { ...readAccess },
                        // writeAccess :{...writeAccess}
                    };
                    const createdItem = yield this.create({
                        data: newData,
                    });
                    const mappedUsers = data.users.map((userId) => ({
                        userId: userId,
                        groupId: createdItem.id,
                        active: true,
                    }));
                    yield base_model_1.default.userGroup.gpCreate(mappedUsers);
                    const mappedRoles = data.roles.map((roleId) => ({
                        roleId: roleId,
                        groupId: createdItem.id,
                        active: true,
                    }));
                    yield base_model_1.default.groupRole.gpCreate(mappedRoles);
                    //   const mappedCompanies = data.companies.map((companyId) => ({
                    //     companyId: companyId,
                    //     groupId: createdItem.id,
                    //     active: true,
                    //   }));
                    //   await prisma.companyGroups.actCreate(mappedCompanies);
                    return createdItem;
                });
            },
            gpUpdate(groupId, newData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const updatedGroup = yield this.update({
                        where: { id: groupId },
                        data: { name: newData.name },
                    });
                    yield base_model_1.default.userGroup.deleteMany({
                        where: { groupId: updatedGroup.id },
                    });
                    yield base_model_1.default.groupRole.deleteMany({
                        where: { groupId: updatedGroup.id },
                    });
                    //   await prisma.companyGroups.deleteMany({
                    //     where: { groupId: updatedGroup.id },
                    //   });
                    const mappedUsers = newData.users.map((userId) => ({
                        userId: userId,
                        groupId: updatedGroup.id,
                        active: true,
                    }));
                    yield base_model_1.default.userGroup.gpCreate(mappedUsers);
                    const mappedRoles = newData.roles.map((roleId) => ({
                        roleId: roleId,
                        groupId: updatedGroup.id,
                        active: true,
                    }));
                    yield base_model_1.default.groupRole.gpCreate(mappedRoles);
                    //   const mappedCompanies = newData.companies.map((companyId) => ({
                    //     companyId: companyId,
                    //     groupId: updatedGroup.id,
                    //     active: true,
                    //   }));
                    //   await prisma.companyGroups.actCreate(mappedCompanies);
                    return updatedGroup;
                });
            },
            getGroupByGroupId(groupId) {
                return __awaiter(this, void 0, void 0, function* () {
                    const excludedId = "58c55d6a-910c-46f8-a422-4604bea6cd15";
                    const Group = yield base_model_1.default.group.findMany({
                        where: {
                            id: groupId,
                            isDeleted: null,
                        },
                        include: {
                            userGroups: {
                                where: {
                                    isDeleted: null,
                                    userId: {
                                        not: excludedId,
                                    },
                                },
                                include: {
                                    user: true,
                                },
                            },
                            groupRoles: {
                                where: {
                                    isDeleted: null,
                                },
                                include: {
                                    role: true,
                                },
                            },
                            //   companyGroups: {
                            //     where: {
                            //       isDeleted: null,
                            //     },
                            //     include: {
                            //       company: true,
                            //     },
                            //   },
                        },
                        orderBy: {
                            name: "asc",
                        },
                    });
                    return Group[0];
                });
            },
        },
    },
});
exports.default = groupModel;
