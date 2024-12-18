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
const bcrypt_1 = __importDefault(require("bcrypt"));
const base_model_1 = __importDefault(require("../../../../core/models/base.model"));
const client_1 = require("@prisma/client");
const token_model_1 = __importDefault(require("../../Token/models/token.model"));
const access_model_1 = __importDefault(require("../../Access/models/access.model"));
const userModel = base_model_1.default.$extends({
    model: {
        user: {
            gpSoftDelete(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const existingItem = yield this.findUnique({ where: { id } });
                    if (existingItem.isDeleted === null) {
                        yield this.update({
                            where: { id },
                            data: { isDeleted: new Date() },
                        });
                    }
                    yield base_model_1.default.loggedInUsers.deleteMany({
                        where: {
                            userId: id,
                        },
                    });
                    yield base_model_1.default.userGroup.deleteMany({
                        where: {
                            userId: id,
                        },
                    });
                    yield base_model_1.default.userRole.deleteMany({
                        where: {
                            userId: id,
                        },
                    });
                    // await prisma.widgetUserConfiguration.deleteMany({
                    //   where: {
                    //     userId: id,
                    //   },
                    // });
                    // await prisma.companyUsers.deleteMany({
                    //   where: {
                    //     userId: id,
                    //   },
                    // });
                });
            },
            //   async changeDefaultCompany(id: string, companyId: string) {
            //     await prisma.user.update({
            //       where: { id },
            //       data: { defaultCompanyId: companyId, updatedAt: new Date() },
            //     });
            //   },
            gpFindUnique(username) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = yield this.findUnique({
                        where: {
                            isDeleted: null,
                            username: username,
                        },
                    });
                    return user;
                });
            },
            gpRemoveLoggedInUser(userId, token) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (token === "") {
                        const users = yield base_model_1.default.loggedInUsers.findMany({
                            where: {
                                userId: userId,
                            },
                        });
                        yield base_model_1.default.loggedInUsers.deleteMany({
                            where: {
                                userId: userId,
                            },
                        });
                        for (const user of users) {
                            yield token_model_1.default.blacklistToken.gpCreate({
                                userId,
                                token: user.token || "",
                                rememberMe: user.rememberMe || false,
                            });
                        }
                        return users;
                    }
                    else {
                        const data = yield base_model_1.default.loggedInUsers.findFirst({
                            where: {
                                userId: userId,
                                token: token,
                            },
                        });
                        // console.log("fetched data");
                        if (data) {
                            yield base_model_1.default.loggedInUsers.delete({
                                where: {
                                    userId: userId,
                                    token: token,
                                },
                            });
                            console.log("deleted");
                            yield token_model_1.default.blacklistToken.gpCreate({
                                userId: userId,
                                token: token,
                                rememberMe: data.rememberMe,
                            });
                        }
                    }
                });
            },
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
            gpCount(userId) {
                return __awaiter(this, void 0, void 0, function* () {
                    const excludedId = "58c55d6a-910c-46f8-a422-4604bea6cd15";
                    const roleIds = yield access_model_1.default.group.getRoleIds(userId);
                    const groupIds = yield access_model_1.default.role.getUserGroupsIds(userId);
                    if (userId === "58c55d6a-910c-46f8-a422-4604bea6cd15") {
                        const count = yield this.count({
                            where: {
                                isDeleted: null,
                                id: {
                                    not: excludedId,
                                },
                            },
                        });
                        return count;
                    }
                    // if (companyId) {
                    //   const count = await this.count({
                    //     where: {
                    //       isDeleted: null,
                    //       companyId: companyId,
                    //       id: {
                    //         not: excludedId,
                    //       },
                    //       OR: [
                    //         {
                    //           readAccess: {
                    //             equals: Prisma.DbNull,
                    //           },
                    //         },
                    //         {
                    //           readAccess: {
                    //             path: ["user"],
                    //             array_contains: userId,
                    //           },
                    //         },
                    //         {
                    //           OR: roleIds.map((roleId) => ({
                    //             readAccess: {
                    //               path: ["role"],
                    //               array_contains: roleId,
                    //             },
                    //           })),
                    //         },
                    //         {
                    //           OR: groupIds.map((groupId) => ({
                    //             readAccess: {
                    //               path: ["group"],
                    //               array_contains: groupId,
                    //             },
                    //           })),
                    //         },
                    //       ],
                    //     },
                    //   });
                    //   return count;
                    // }
                    const count = yield this.count({
                        where: {
                            isDeleted: null,
                            id: {
                                not: excludedId,
                            },
                            // OR: [
                            //   {
                            //     readAccess: {
                            //       equals: Prisma.DbNull,
                            //     },
                            //   },
                            //   {
                            //     readAccess: {
                            //       path: ["user"],
                            //       array_contains: userId,
                            //     },
                            //   },
                            //   {
                            //     OR: roleIds.map((roleId) => ({
                            //       readAccess: {
                            //         path: ["role"],
                            //         array_contains: roleId,
                            //       },
                            //     })),
                            //   },
                            //   {
                            //     OR: groupIds.map((groupId) => ({
                            //       readAccess: {
                            //         path: ["group"],
                            //         array_contains: groupId,
                            //       },
                            //     })),
                            //   },
                            // ],
                        },
                    });
                    return count;
                });
            },
            detailedUser(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (id === "58c55d6a-910c-46f8-a422-4604bea6cd15") {
                        return null;
                    }
                    const data = yield base_model_1.default.$queryRaw(client_1.Prisma.sql `SELECT 
    "User".username,
    ARRAY(
        SELECT DISTINCT "R"."name" 
        FROM "UserRole" AS "UR" 
        LEFT JOIN "Role" AS "R" 
        ON "UR"."roleId" = "R".id 
        WHERE "UR"."userId" = "User".id 
          AND "UR"."isDeleted" IS NULL 
          AND "R"."isDeleted" IS NULL
    ) AS "userRole",
    ARRAY(
        SELECT DISTINCT "G"."name" 
        FROM "UserGroup" AS "UG" 
        LEFT JOIN "Group" AS "G" 
        ON "UG"."groupId" = "G".id 
        WHERE "UG"."userId" = "User".id 
          AND "UG"."isDeleted" IS NULL 
          AND "G"."isDeleted" IS NULL
    ) AS "userGroup"
FROM "User"
WHERE "User".id = ${id}
  AND "User"."isDeleted" IS NULL;
      `);
                    const userData = {
                        id: data[0].id,
                        username: data[0].username,
                        //   defaultCompanyId: data[0].defaultCompanyId,
                        password: "",
                        userRole: data[0].userRole,
                        userGroup: data[0].userGroup,
                        //   companyUser: data[0].companyUser,
                    };
                    return userData;
                });
            },
            gpPgFindMany(page, pageSize, userId
            // companyId?: string
            ) {
                return __awaiter(this, void 0, void 0, function* () {
                    const skip = (page - 1) * pageSize;
                    const excludedId = "58c55d6a-910c-46f8-a422-4604bea6cd15";
                    // const roleIds: string[] = rbacModel.user.getUserGroups(userId);
                    const roleIds = yield access_model_1.default.group.getRoleIds(userId);
                    const groupIds = yield access_model_1.default.role.getUserGroupsIds(userId);
                    // console.log(userId);
                    // console.log(roleIds);
                    // console.log(groupIds);
                    if (userId === "58c55d6a-910c-46f8-a422-4604bea6cd15") {
                        const data = yield this.findMany({
                            where: {
                                isDeleted: null,
                                id: {
                                    not: excludedId,
                                },
                            },
                            take: pageSize,
                            skip: skip,
                            orderBy: {
                                createdAt: "asc",
                            },
                        });
                        const totalSize = yield this.count({
                            where: {
                                isDeleted: null,
                                id: {
                                    not: excludedId,
                                },
                            },
                        });
                        return { data, totalSize };
                    }
                    // const accessCondition = {
                    //   OR: [
                    //     {
                    //       readAccess: {
                    //         equals: Prisma.DbNull,
                    //       },
                    //     },
                    //     {
                    //       readAccess: {
                    //         path: ["user"],
                    //         array_contains: userId,
                    //       },
                    //     },
                    //     {
                    //       OR: roleIds.map((roleId) => ({
                    //         readAccess: {
                    //           path: ["role"],
                    //           array_contains: roleId,
                    //         },
                    //       })),
                    //     },
                    //     {
                    //       OR: groupIds.map((groupId) => ({
                    //         readAccess: {
                    //           path: ["group"],
                    //           array_contains: groupId,
                    //         },
                    //       })),
                    //     },
                    //   ],
                    // };
                    const combinedCondition = {
                        AND: [{ isDeleted: null }],
                    };
                    // if (companyId) {
                    //   const combinedCondition = {
                    //     AND: [{ isDeleted: null, companyId: companyId }, accessCondition],
                    //   };
                    //   const data = await this.findMany({
                    //     where: {
                    //       ...combinedCondition,
                    //       id: {
                    //         not: excludedId,
                    //       },
                    //     },
                    //     take: pageSize,
                    //     skip: skip,
                    //     orderBy: {
                    //       createdAt: "asc",
                    //     },
                    //   });
                    //   const totalSize = await this.count({
                    //     where: {
                    //       ...combinedCondition,
                    //       id: {
                    //         not: excludedId,
                    //       },
                    //     },
                    //   });
                    //   return { data, totalSize };
                    // }
                    const data = yield this.findMany({
                        where: Object.assign(Object.assign({}, combinedCondition), { id: {
                                not: excludedId,
                            } }),
                        take: pageSize,
                        skip: skip,
                        orderBy: {
                            createdAt: "asc",
                        },
                    });
                    const totalSize = yield this.count({
                        where: Object.assign(Object.assign({}, combinedCondition), { id: {
                                not: excludedId,
                            } }),
                    });
                    return { data, totalSize };
                });
            },
            gpSearch(searchTerm_1, columns_1) {
                return __awaiter(this, arguments, void 0, function* (searchTerm, columns, pageNumber = 1, pageSize = 10
                // userId: string
                ) {
                    const excludedId = "58c55d6a-910c-46f8-a422-4604bea6cd15";
                    // const roleIds: string[] = rbacModel.user.getUserGroups(userId);
                    // const roleIds: string[] = await accessModel.group.getRoleIds(userId);
                    // const groupIds: string[] = await accessModel.role.getUserGroupsIds(
                    //   userId
                    // );
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
                    // if (userId === "58c55d6a-910c-46f8-a422-4604bea6cd15") {
                    //   const [data, totalSize] = await Promise.all([
                    //     this.findMany({
                    //       where: {
                    //         isDeleted: null,
                    //         id: {
                    //           not: excludedId,
                    //         },
                    //         ...mainCondition,
                    //       },
                    //       skip: offset,
                    //       take: pageSize,
                    //     }),
                    //     this.count({
                    //       where: {
                    //         isDeleted: null,
                    //         id: {
                    //           not: excludedId,
                    //         },
                    //         ...mainCondition,
                    //       },
                    //     }),
                    //   ]);
                    //   return { data, totalSize };
                    // }
                    // const accessCondition = {
                    //   OR: [
                    //     {
                    //       readAccess: {
                    //         equals: Prisma.DbNull,
                    //       },
                    //     },
                    //     {
                    //       readAccess: {
                    //         path: ["user"],
                    //         array_contains: userId,
                    //       },
                    //     },
                    //     {
                    //       OR: roleIds.map((roleId) => ({
                    //         readAccess: {
                    //           path: ["role"],
                    //           array_contains: roleId,
                    //         },
                    //       })),
                    //     },
                    //     {
                    //       OR: groupIds.map((groupId) => ({
                    //         readAccess: {
                    //           path: ["group"],
                    //           array_contains: groupId,
                    //         },
                    //       })),
                    //     },
                    //   ],
                    // };
                    const combinedCondition = {
                        AND: [
                            {
                                isDeleted: null,
                                id: {
                                    not: excludedId,
                                },
                            },
                            // accessCondition,
                            mainCondition,
                        ],
                    };
                    const [data, totalSize] = yield Promise.all([
                        this.findMany({
                            where: Object.assign(Object.assign({}, combinedCondition), { id: {
                                    not: excludedId,
                                } }),
                            skip: offset,
                            take: pageSize,
                        }),
                        this.count({
                            where: Object.assign(Object.assign({}, combinedCondition), { id: {
                                    not: excludedId,
                                } }),
                        }),
                    ]);
                    return { data, totalSize };
                });
            },
            // async actFindById(this: any, id: string) {
            //   const data = await this.findUnique({
            //     where: {
            //       id: id,
            //       isDeleted: null,
            //     },
            //     select: {
            //       id: true,
            //       username: true,
            //     },
            //   });
            //   return data;
            // },
            // async actFindById(this: any, id: string): Promise<UserData> {
            //   const userData = await this.findUnique({
            //     where: {
            //       id: id,
            //       isDeleted: null,
            //     },
            //     select: {
            //       id: true,
            //       username: true,
            //       userRoles: {
            //         select: {
            //           id: true,
            //           name: true,
            //         },
            //       },
            //       userGroups: {
            //         select: {
            //           id: true,
            //           name: true,
            //         },
            //       },
            //     },
            //   });
            //   // Extract role IDs and names from userRoles
            //   const userRoleIds: string[] = userData.userRoles.map(
            //     (role: any) => role.id
            //   );
            //   const userRoleNames: string[] = userData.userRoles.map(
            //     (role: any) => role.name
            //   );
            //   // Extract group IDs and names from userGroups
            //   const userGroupIds: string[] = userData.userGroups.map(
            //     (group: any) => group.id
            //   );
            //   const userGroupNames: string[] = userData.userGroups.map(
            //     (group: any) => group.name
            //   );
            //   return {
            //     id: userData.id,
            //     username: userData.username,
            //     password: "", // Return an empty string for password for security reasons
            //     userRole: userRoleIds, // Return array of role IDs
            //     // roleName: userRoleNames, // Return array of role names
            //     userGroup: userGroupIds, // Return array of group IDs
            //     // groupName: userGroupNames, // Return array of group names
            //   };
            // },
            gpCreate(data) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (data.username === "" || data.password === "") {
                        return "User not created";
                    }
                    // const rules: BusinessRule[] =
                    //   await businessRuleModel.businessRule.actFindByFeatureId(
                    //     "user.create.*"
                    //   );
                    // const readAccess = rules[0].operation.readAccess;
                    // const writeAccess = rules[0].operation.writeAccess;
                    const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
                    const newData = {
                        username: data.username,
                        password: hashedPassword,
                        //   defaultCompanyId: data.companyUser[0],
                        // readAccess: { ...readAccess },
                        // writeAccess:{...writeAccess},
                        createdAt: new Date(),
                    };
                    if (data === null || data === void 0 ? void 0 : data.id) {
                        newData.id = data.id;
                    }
                    const createdUser = yield this.create({
                        data: newData,
                    });
                    if (data.userRole.length > 0) {
                        for (const roleId of data.userRole) {
                            const role = yield base_model_1.default.role.findUnique({
                                where: { id: roleId },
                            });
                            if (role) {
                                const userRole = { userId: createdUser.id, roleId, active: true };
                                yield base_model_1.default.userRole.gpCreate(userRole);
                            }
                            else {
                                return "Role does not exist";
                            }
                        }
                    }
                    if (data.userGroup.length > 0) {
                        for (const groupId of data.userGroup) {
                            const group = yield base_model_1.default.group.findUnique({
                                where: { id: groupId },
                            });
                            if (group) {
                                const userGroup = {
                                    userId: createdUser.id,
                                    groupId,
                                    active: true,
                                };
                                yield base_model_1.default.userGroup.gpCreate(userGroup);
                            }
                            else {
                                return "Group does not exist";
                            }
                        }
                    }
                    // if (data.companyUser.length > 0) {
                    //   for (const companyId of data.companyUser) {
                    //     const company = await prisma.company.findUnique({
                    //       where: { id: companyId },
                    //     });
                    //     if (company) {
                    //       const userCompany = {
                    //         userId: createdUser.id,
                    //         companyId,
                    //         active: true,
                    //       };
                    //       await prisma.companyUsers.actCreate(userCompany);
                    //     } else {
                    //       return "Company does not exist";
                    //     }
                    //   }
                    // }
                    return createdUser;
                });
            },
            getLoggedInUser(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = yield userModel.user.findFirst({
                        where: {
                            id: id,
                        },
                    });
                    return user === null || user === void 0 ? void 0 : user.username;
                });
            },
            checkPreviousPassowrd(id, password) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = yield base_model_1.default.user.gpFindById(id);
                    if (bcrypt_1.default.compareSync(password, user.password)) {
                        return true;
                    }
                    return false;
                });
            },
            changePassowrd(id, password) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = yield userModel.user.gpFindById(id);
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    const newData = {
                        username: user.username,
                        password: hashedPassword,
                    };
                    const updated = yield base_model_1.default.user.gpUpdate(id, newData);
                    return updated;
                });
            },
            gpUpdate(id, data) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (data.username === "") {
                        return "User not updated";
                    }
                    try {
                        const user = yield userModel.user.findFirst({
                            where: {
                                id: id,
                            },
                        });
                        let newData = {
                            username: data.username,
                            password: user === null || user === void 0 ? void 0 : user.password,
                            updatedAt: new Date(),
                        };
                        const updatedUser = yield this.update({
                            where: { id: id },
                            data: newData,
                        });
                        // Update user roles
                        yield base_model_1.default.userRole.deleteMany({
                            where: { userId: id },
                        });
                        for (const roleId of data.userRole) {
                            const role = yield base_model_1.default.role.findUnique({
                                where: { id: roleId },
                            });
                            if (role) {
                                const userRole = { userId: id, roleId, active: true };
                                yield base_model_1.default.userRole.create({
                                    data: userRole,
                                });
                            }
                            else {
                                return "Role does not exist";
                            }
                        }
                        // Update user groups
                        yield base_model_1.default.userGroup.deleteMany({
                            where: { userId: id },
                        });
                        for (const groupId of data.userGroup) {
                            const group = yield base_model_1.default.group.findUnique({
                                where: { id: groupId },
                            });
                            if (group) {
                                const userGroup = {
                                    userId: id,
                                    groupId,
                                    active: true,
                                };
                                yield base_model_1.default.userGroup.create({
                                    data: userGroup,
                                });
                            }
                            else {
                                return "Group does not exist";
                            }
                        }
                        //   await prisma.companyUsers.deleteMany({
                        //     where: { userId: id },
                        //   });
                        //   if (data.companyUser.length > 0) {
                        //     for (const companyId of data.companyUser) {
                        //       const company = await prisma.company.findUnique({
                        //         where: { id: companyId },
                        //       });
                        //       if (company) {
                        //         const userCompany = {
                        //           userId: updatedUser.id,
                        //           companyId,
                        //           active: true,
                        //         };
                        //         await prisma.companyUsers.create({
                        //           data: userCompany,
                        //         });
                        //       } else {
                        //         return "Company does not exist";
                        //       }
                        //     }
                        //   }
                        return updatedUser;
                    }
                    catch (error) {
                        console.error("Error updating user:", error);
                        return "Error updating user";
                    }
                });
            },
            gpFindById(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const data = yield base_model_1.default.$queryRaw(client_1.Prisma.sql `SELECT "User".username,  
          ARRAY(SELECT DISTINCT "R"."name" FROM "UserRole" AS "UR" LEFT JOIN "Role" AS "R" ON "UR"."roleId" = "R".id WHERE "UR"."userId" = "User".id) AS "userRole", 
          ARRAY(SELECT DISTINCT "G"."name" FROM "UserGroup" AS "UG" LEFT JOIN "Group" AS "G" ON "UG"."groupId" = "G".id WHERE "UG"."userId" = "User".id) AS "userGroup"
		  FROM "User"
   WHERE "User".id =${id};
        `);
                    const userData = {
                        id: data[0].id,
                        username: data[0].username,
                        //   defaultCompanyId: data[0].defaultCompanyId,
                        password: "",
                        userRole: data[0].userRole,
                        userGroup: data[0].userGroup,
                        //   companyUser: data[0].companyUser,
                    };
                    return userData;
                });
            },
            // async actCreate(this: any, createdData: any) {
            //   const { password, ...userData } = createdData;
            //   const hashedPassword = await bcrypt.hash(password, 10);
            //   const newData = {
            //     ...userData,
            //     password: hashedPassword,
            //     createdAt: new Date(),
            //   };
            //   const createdItem = await this.create({
            //     data: newData,
            //   });
            //   return createdItem;
            // },
        },
    },
});
exports.default = userModel;
