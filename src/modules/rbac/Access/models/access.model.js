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
const prisma = new client_1.PrismaClient({
// log: ["query"],
});
const accessModel = prisma.$extends({
    model: {
        $allModels: {
            getUserGroups(userId) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const groups = yield prisma.group.findMany({
                            where: {
                                userGroups: {
                                    some: {
                                        userId: userId,
                                        active: true,
                                    },
                                },
                            },
                        });
                        return groups;
                    }
                    catch (error) {
                        console.error("Error fetching user groups:", error);
                        return [];
                    }
                });
            },
            getUserGroupsIds(userId) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const groups = yield prisma.group.findMany({
                            where: {
                                userGroups: {
                                    some: {
                                        userId: userId,
                                        active: true,
                                    },
                                },
                            },
                            select: {
                                id: true,
                            },
                        });
                        return groups.map((group) => group.id);
                    }
                    catch (error) {
                        console.error("Error fetching user groups:", error);
                        return [];
                    }
                });
            },
            getUserRoles(userId) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const userRoles = yield prisma.userRole.findMany({
                            where: {
                                userId: userId,
                                active: true,
                            },
                        });
                        if (userRoles.length === 0) {
                            return [];
                        }
                        return userRoles;
                    }
                    catch (error) {
                        console.error("Error fetching user roles:", error);
                        return [];
                    }
                });
            },
            getGroupRoles(groupId) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const groupRoles = yield prisma.groupRole.findMany({
                            where: {
                                groupId: groupId,
                                active: true,
                            },
                        });
                        if (groupRoles.length === 0) {
                            return [];
                        }
                        return groupRoles;
                    }
                    catch (error) {
                        console.error("Error fetching group roles:", error);
                        return [];
                    }
                });
            },
            getUserRolesIds(userId) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const userRoles = yield prisma.userRole.findMany({
                            where: {
                                userId: userId,
                                active: true,
                            },
                            select: {
                                roleId: true,
                            },
                        });
                        return userRoles.map((role) => role.roleId);
                    }
                    catch (error) {
                        console.error("Error fetching user roles:", error);
                        return [];
                    }
                });
            },
            getGroupRolesIds(groupId) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const groupRoles = yield prisma.groupRole.findMany({
                            where: {
                                groupId: groupId,
                                active: true,
                            },
                            select: {
                                roleId: true,
                            },
                        });
                        return groupRoles.map((role) => role.roleId);
                    }
                    catch (error) {
                        console.error("Error fetching group roles:", error);
                        return [];
                    }
                });
            },
            getRoleIds(userId) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const userRoleIds = yield this.getUserRolesIds(userId);
                        const userGroups = yield accessModel.user.getUserGroups(userId);
                        let groupRoleIds = [];
                        for (const group of userGroups) {
                            const roles = yield this.getGroupRolesIds(group.id);
                            groupRoleIds = [...groupRoleIds, ...roles];
                        }
                        return [...userRoleIds, ...groupRoleIds];
                    }
                    catch (error) {
                        console.error("Error fetching combined role IDs:", error);
                        return [];
                    }
                });
            },
            checkUserPermission(userId, featureId) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // Bypass permission checks if userId matches the specified value
                        if (userId === "58c55d6a-910c-46f8-a422-4604bea6cd15") {
                            // Check if the featureId matches one of the restricted IDs
                            if (
                            //   featureId === "ca.create.*" ||
                            //   featureId === "voucher.create.*" ||
                            featureId === "contact.create.*") {
                                return false; // Special case: deny permission
                            }
                            else {
                                return true;
                            }
                        }
                        if (userId === "58c55d6a-910c-46f8-a422-4604bea6cd15") {
                            return true;
                        }
                        const feature = yield prisma.appFeature.findUnique({
                            where: {
                                name: featureId,
                            },
                        });
                        if (!feature) {
                            return true;
                        }
                        const userRoles = yield accessModel.user.getUserRoles(userId);
                        const isAllowedDirectly = yield accessModel.user.isFeatureAllowed(userId, featureId);
                        if (isAllowedDirectly) {
                            return true;
                        }
                        const userGroups = yield accessModel.user.getUserGroups(userId);
                        for (const group of userGroups) {
                            const isAllowedInGroup = yield accessModel.user.isFeatureAllowed(group.id, featureId);
                            if (isAllowedInGroup) {
                                return true;
                            }
                        }
                        for (const group of userGroups) {
                            const groupRoles = yield accessModel.user.getGroupRoles(group.id);
                            for (const role of groupRoles) {
                                const isAllowedForRole = yield accessModel.user.isFeatureAllowed(role.roleId, featureId);
                                if (isAllowedForRole) {
                                    return true;
                                }
                            }
                        }
                        for (const role of userRoles) {
                            if (role) {
                                const isAllowedForRole = yield accessModel.user.isFeatureAllowed(role.roleId, featureId);
                                if (isAllowedForRole) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }
                    catch (error) {
                        console.error("Error checking user permission:", error);
                        return false;
                    }
                });
            },
            checkUserPermissions(userId, featureIds) {
                return __awaiter(this, void 0, void 0, function* () {
                    const permissionPromises = featureIds.map((featureId) => __awaiter(this, void 0, void 0, function* () {
                        const permission = yield this.checkUserPermission(userId, featureId);
                        return { featureId, permission };
                    }));
                    const results = yield Promise.all(permissionPromises);
                    return results.reduce((acc, { featureId, permission }) => {
                        acc[featureId] = permission;
                        return acc;
                    }, {});
                });
            },
            isFeatureAllowed(parentId, featureId) {
                return __awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    try {
                        if (parentId === "58c55d6a-910c-46f8-a422-4604bea6cd15") {
                            return true;
                        }
                        const permission = yield prisma.featurePermission.findFirst({
                            where: {
                                parentId: parentId,
                                isDeleted: null,
                            },
                        });
                        if (!permission) {
                            return false;
                        }
                        const allowedFeatures = (_b = (_a = permission.permissions) === null || _a === void 0 ? void 0 : _a.allowedFeatures) !== null && _b !== void 0 ? _b : [];
                        if (Array.isArray(allowedFeatures)) {
                            return allowedFeatures.includes(featureId);
                        }
                        else {
                            console.error("allowedFeatures is not an array:", allowedFeatures);
                            return false;
                        }
                    }
                    catch (error) {
                        console.error("Error checking feature permission:", error);
                        return false;
                    }
                });
            },
        },
    },
});
exports.default = accessModel;
