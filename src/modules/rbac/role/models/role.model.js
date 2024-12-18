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
const roleModel = base_model_1.default.$extends({
    model: {
        role: {
            gpFindMany() {
                return __awaiter(this, void 0, void 0, function* () {
                    const excludedId = "58c55d6a-910c-46f8-a422-4604bea6cd15";
                    const data = yield this.findMany({
                        where: {
                            isDeleted: null,
                            id: {
                                not: excludedId,
                            },
                        },
                    });
                    return data;
                });
            },
            gpSoftDelete(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const existingItem = yield this.findUnique({ where: { id } });
                    if (existingItem.isDeleted === null) {
                        yield this.update({
                            where: { id },
                            data: { isDeleted: new Date() },
                        });
                    }
                    yield base_model_1.default.userRole.deleteMany({
                        where: {
                            roleId: id
                        }
                    });
                    yield base_model_1.default.groupRole.deleteMany({
                        where: {
                            groupId: id
                        }
                    });
                });
            },
            changeRole(userId, role) {
                return __awaiter(this, void 0, void 0, function* () {
                    const userRole = yield base_model_1.default.userRole.findFirst({
                        where: {
                            userId: userId,
                            isDeleted: null,
                        },
                    });
                    if (!userRole) {
                        throw new Error(`User role for user ${userId} not found.`);
                    }
                    const roleData = yield base_model_1.default.role.findFirst({
                        where: {
                            name: role,
                        },
                    });
                    const newRole = {
                        userId: userId,
                        roleId: roleData === null || roleData === void 0 ? void 0 : roleData.id,
                    };
                    yield base_model_1.default.userRole.gpUpdate(userRole.id, newRole);
                    return newRole;
                });
            },
            gpCreate(data) {
                return __awaiter(this, void 0, void 0, function* () {
                    // const rules: BusinessRule[] =
                    //   await businessRuleModel.businessRule.actFindByFeatureId(
                    //     "role.create.*"
                    //   );
                    // const readAccess = rules[0].operation.readAccess;
                    // const writeAccess = rules[0].operation.writeAccess;
                    let newData = {
                        name: data.name,
                        createdAt: new Date(),
                        // readAccess: { ...readAccess },
                        // writeAccess: { ...writeAccess }
                    };
                    const createdItem = yield this.create({
                        data: newData,
                    });
                    const mappedUsers = data.users.map((userId) => ({
                        userId: userId,
                        roleId: createdItem.id,
                        active: true,
                    }));
                    yield base_model_1.default.userRole.gpCreate(mappedUsers);
                    const mappedGroups = data.groups.map((groupId) => ({
                        groupId: groupId,
                        roleId: createdItem.id,
                        active: true,
                    }));
                    yield base_model_1.default.groupRole.gpCreate(mappedGroups);
                    return createdItem;
                });
            },
            gpUpdate(roleId, newData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const updatedRole = yield this.update({
                        where: { id: roleId },
                        data: { name: newData.name },
                    });
                    yield base_model_1.default.userRole.deleteMany({
                        where: { roleId: updatedRole.id },
                    });
                    yield base_model_1.default.groupRole.deleteMany({
                        where: { roleId: updatedRole.id },
                    });
                    const mappedUsers = newData.users.map((userId) => ({
                        userId: userId,
                        roleId: updatedRole.id,
                        active: true,
                    }));
                    yield base_model_1.default.userRole.gpCreate(mappedUsers);
                    const mappedGroups = newData.groups.map((groupId) => ({
                        groupId: groupId,
                        roleId: updatedRole.id,
                        active: true,
                    }));
                    yield base_model_1.default.groupRole.gpCreate(mappedGroups);
                    return updatedRole;
                });
            },
            getRoleByroleId(roleId) {
                return __awaiter(this, void 0, void 0, function* () {
                    const excludedId = "58c55d6a-910c-46f8-a422-4604bea6cd15";
                    const Role = yield base_model_1.default.role.findMany({
                        where: {
                            id: roleId,
                            isDeleted: null,
                        },
                        include: {
                            userRoles: {
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
                                    group: true,
                                },
                            },
                        },
                        orderBy: {
                            name: "asc",
                        },
                    });
                    return Role[0];
                });
            }
        },
    },
});
exports.default = roleModel;
