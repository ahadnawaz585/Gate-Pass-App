// import bcrypt from "bcrypt";
// import prisma from "../../../../core/models/base.model";
// import { Prisma } from "@prisma/client";
// import { User,UserData } from "../types/user";
// import blacklistTokenModel from "./blackListToken.model";
// import { blackListedTokens } from "../types/blackListedToken";
// import rbacModel from "./rbac.model";
// import { BusinessRule } from "../types/businessRule";
// import businessRuleModel from "./bussinessRule.model";
// import { create } from "domain";
// const userModel = prisma.$extends({
//   model: {
//     user: {
//       async actSoftDelete(this: any, id: string) {
//         const existingItem = await this.findUnique({ where: { id } });
//         if (existingItem.isDeleted === null) {
//           await this.update({
//             where: { id },
//             data: { isDeleted: new Date() },
//           });
//         }

//         await prisma.loggedInUsers.deleteMany({
//           where: {
//             userId: id,
//           },
//         });

//         await prisma.userGroup.deleteMany({
//           where: {
//             userId: id,
//           },
//         });

//         await prisma.userRole.deleteMany({
//           where: {
//             userId: id,
//           },
//         });

//         await prisma.widgetUserConfiguration.deleteMany({
//           where: {
//             userId: id,
//           },
//         });

//         await prisma.companyUsers.deleteMany({
//           where: {
//             userId: id,
//           },
//         });
//       },
//       async changeDefaultCompany(id: string, companyId: string) {
//         await prisma.user.update({
//           where: { id },
//           data: { defaultCompanyId: companyId, updatedAt: new Date() },
//         });
//       },

//       async actFindUnique(this: any, username: any) {
//         const user = await this.findUnique({
//           where: {
//             isDeleted: null,
//             username: username,
//           },
//         });
//         return user;
//       },

//       async actRemoveLoggedInUser(this: any, userId: string, token: string) {
//         if (token === "") {
//           const users = await prisma.loggedInUsers.findMany({
//             where: {
//               userId: userId,
//             },
//           });

//           await prisma.loggedInUsers.deleteMany({
//             where: {
//               userId: userId,
//             },
//           });

//           for (const user of users) {
//             await blacklistTokenModel.blacklistToken.actCreate({
//               userId,
//               token: user.token || "",
//               rememberMe: user.rememberMe || false
//             });
//           }

//           return users;
//         } else {
    
//           const data = await prisma.loggedInUsers.findFirst({
//             where: {
//               userId: userId,
//               token: token,
//             },
//           });

//           // console.log("fetched data");
//           if (data) {
//             await prisma.loggedInUsers.delete({
//               where: {
//                 userId: userId,
//                 token: token,
//               },
//             });

//             console.log("deleted");
//             await blacklistTokenModel.blacklistToken.actCreate({
//               userId: userId,
//               token: token,
//               rememberMe:data.rememberMe
//             });
//           }
//         }
//       },

//       async actFindMany(this: any) {
//         const excludedId = "58c55d6a-910c-46f8-a422-4604bea6cd15";
//         const data = await this.findMany({
//           where: {
//             isDeleted: null,
//             id: {
//               not: excludedId,
//             },
//           },
//         });

//         return data;
//       },

//       async actCount(this: any, userId: string, companyId?: string) {
//         const excludedId = "58c55d6a-910c-46f8-a422-4604bea6cd15";
//         const roleIds: string[] = await rbacModel.group.getRoleIds(userId);
//         const groupIds: string[] = await rbacModel.role.getUserGroupsIds(
//           userId
//         );
//         if (
//           userId === "58c55d6a-910c-46f8-a422-4604bea6cd15" ||
//           companyId === "a9f53d14-7177-45ef-bf74-f4b8d1a6ce0e"
//         ) {
//           const count = await this.count({
//             where: {
//               isDeleted: null,
//               id: {
//                 not: excludedId,
//               },
//             },
//           });
//           return count;
//         }

//         if (companyId) {
//           const count = await this.count({
//             where: {
//               isDeleted: null,
//               companyId: companyId,
//               id: {
//                 not: excludedId,
//               },
//               OR: [
//                 {
//                   readAccess: {
//                     equals: Prisma.DbNull,
//                   },
//                 },
//                 {
//                   readAccess: {
//                     path: ["user"],
//                     array_contains: userId,
//                   },
//                 },
//                 {
//                   OR: roleIds.map((roleId) => ({
//                     readAccess: {
//                       path: ["role"],
//                       array_contains: roleId,
//                     },
//                   })),
//                 },
//                 {
//                   OR: groupIds.map((groupId) => ({
//                     readAccess: {
//                       path: ["group"],
//                       array_contains: groupId,
//                     },
//                   })),
//                 },
//               ],
//             },
//           });
//           return count;
//         }

//         const count = await this.count({
//           where: {
//             isDeleted: null,
//             id: {
//               not: excludedId,
//             },
//             OR: [
//               {
//                 readAccess: {
//                   equals: Prisma.DbNull,
//                 },
//               },
//               {
//                 readAccess: {
//                   path: ["user"],
//                   array_contains: userId,
//                 },
//               },
//               {
//                 OR: roleIds.map((roleId) => ({
//                   readAccess: {
//                     path: ["role"],
//                     array_contains: roleId,
//                   },
//                 })),
//               },
//               {
//                 OR: groupIds.map((groupId) => ({
//                   readAccess: {
//                     path: ["group"],
//                     array_contains: groupId,
//                   },
//                 })),
//               },
//             ],
//           },
//         });
//         return count;
//       },
//       async detailedUser(id: string) {
//         if (id === "58c55d6a-910c-46f8-a422-4604bea6cd15") {
//           return null;
//         }
//         const data: UserData[] =
//           await prisma.$queryRaw(Prisma.sql`SELECT "User".username, "User"."defaultCompanyId" ,
//           ARRAY(SELECT DISTINCT "R"."name" FROM "UserRole" AS "UR" LEFT JOIN "Role" AS "R" ON "UR"."roleId" = "R".id WHERE "UR"."userId" = "User".id) AS "userRole", 
//           ARRAY(SELECT DISTINCT "G"."name" FROM "UserGroup" AS "UG" LEFT JOIN "Group" AS "G" ON "UG"."groupId" = "G".id WHERE "UG"."userId" = "User".id) AS "userGroup",
//           ARRAY(SELECT DISTINCT "C"."name" FROM "CompanyUsers" AS "CU" LEFT JOIN "Company" AS "C" ON "CU"."companyId" = "C".id WHERE "CU"."userId" = "User".id) AS "companyUser"
// 		  FROM "User"
//    WHERE "User".id =${id};
//       `);

//         const userData: UserData = {
//           id: data[0].id,
//           username: data[0].username,
//           defaultCompanyId: data[0].defaultCompanyId,
//           password: "",
//           userRole: data[0].userRole,
//           userGroup: data[0].userGroup,
//           companyUser: data[0].companyUser,
//         };

//         return userData;
//       },
//       async actPgFindMany(
//         this: any,
//         page: number,
//         pageSize: number,
//         userId: string,
//         companyId?: string
//       ) {
//         const skip = (page - 1) * pageSize;
//         const excludedId = "58c55d6a-910c-46f8-a422-4604bea6cd15";
//         // const roleIds: string[] = rbacModel.user.getUserGroups(userId);
//         const roleIds: string[] = await rbacModel.group.getRoleIds(userId);
//         const groupIds: string[] = await rbacModel.role.getUserGroupsIds(
//           userId
//         );

//         // console.log(userId);
//         // console.log(roleIds);
//         // console.log(groupIds);
//         if (
//           userId === "58c55d6a-910c-46f8-a422-4604bea6cd15" ||
//           companyId === "a9f53d14-7177-45ef-bf74-f4b8d1a6ce0e"
//         ) {
//           const data = await this.findMany({
//             where: {
//               isDeleted: null,
//               id: {
//                 not: excludedId,
//               },
//             },
//             take: pageSize,
//             skip: skip,
//             orderBy: {
//               createdAt: "asc",
//             },
//           });

//           const totalSize = await this.count({
//             where: {
//               isDeleted: null,
//               id: {
//                 not: excludedId,
//               },
//             },
//           });

//           return { data, totalSize };
//         }

//         const accessCondition = {
//           OR: [
//             {
//               readAccess: {
//                 equals: Prisma.DbNull,
//               },
//             },

//             {
//               readAccess: {
//                 path: ["user"],
//                 array_contains: userId,
//               },
//             },
//             {
//               OR: roleIds.map((roleId) => ({
//                 readAccess: {
//                   path: ["role"],
//                   array_contains: roleId,
//                 },
//               })),
//             },
//             {
//               OR: groupIds.map((groupId) => ({
//                 readAccess: {
//                   path: ["group"],
//                   array_contains: groupId,
//                 },
//               })),
//             },
//           ],
//         };

//         const combinedCondition = {
//           AND: [{ isDeleted: null }, accessCondition],
//         };

//         if (companyId) {
//           const combinedCondition = {
//             AND: [{ isDeleted: null, companyId: companyId }, accessCondition],
//           };
//           const data = await this.findMany({
//             where: {
//               ...combinedCondition,
//               id: {
//                 not: excludedId,
//               },
//             },
//             take: pageSize,
//             skip: skip,
//             orderBy: {
//               createdAt: "asc",
//             },
//           });

//           const totalSize = await this.count({
//             where: {
//               ...combinedCondition,
//               id: {
//                 not: excludedId,
//               },
//             },
//           });

//           return { data, totalSize };
//         }

//         const data = await this.findMany({
//           where: {
//             ...combinedCondition,
//             id: {
//               not: excludedId,
//             },
//           },
//           take: pageSize,
//           skip: skip,
//           orderBy: {
//             createdAt: "asc",
//           },
//         });

//         const totalSize = await this.count({
//           where: {
//             ...combinedCondition,
//             id: {
//               not: excludedId,
//             },
//           },
//         });

//         return { data, totalSize };
//       },

//       async actSearch(
//         this: any,
//         searchTerm: string | string[],
//         columns: string[],
//         pageNumber: number = 1,
//         pageSize: number = 10,
//         userId: string
//       ) {
//         const excludedId = "58c55d6a-910c-46f8-a422-4604bea6cd15";
//         // const roleIds: string[] = rbacModel.user.getUserGroups(userId);
//         const roleIds: string[] = await rbacModel.group.getRoleIds(userId);
//         const groupIds: string[] = await rbacModel.role.getUserGroupsIds(
//           userId
//         );
//         const searchTermsArray = Array.isArray(searchTerm)
//           ? searchTerm
//           : [searchTerm];
//         let mainCondition = {};

//         for (let i = 0; i < searchTermsArray.length; i++) {
//           const term = searchTermsArray[i];
//           const condition = {
//             OR: columns.map((column) => ({
//               [column]: {
//                 mode: "insensitive",
//                 contains: term,
//               },
//             })),
//           };

//           if (i === 0) {
//             mainCondition = condition;
//           } else {
//             mainCondition = {
//               AND: [mainCondition, condition],
//             };
//           }
//         }

//         const offset = (pageNumber - 1) * pageSize;
//         if (userId === "58c55d6a-910c-46f8-a422-4604bea6cd15") {
//           const [data, totalSize] = await Promise.all([
//             this.findMany({
//               where: {
//                 isDeleted: null,
//                 id: {
//                   not: excludedId,
//                 },
//                 ...mainCondition,
//               },
//               skip: offset,
//               take: pageSize,
//             }),
//             this.count({
//               where: {
//                 isDeleted: null,
//                 id: {
//                   not: excludedId,
//                 },
//                 ...mainCondition,
//               },
//             }),
//           ]);

//           return { data, totalSize };
//         }

//         const accessCondition = {
//           OR: [
//             {
//               readAccess: {
//                 equals: Prisma.DbNull,
//               },
//             },
//             {
//               readAccess: {
//                 path: ["user"],
//                 array_contains: userId,
//               },
//             },
//             {
//               OR: roleIds.map((roleId) => ({
//                 readAccess: {
//                   path: ["role"],
//                   array_contains: roleId,
//                 },
//               })),
//             },
//             {
//               OR: groupIds.map((groupId) => ({
//                 readAccess: {
//                   path: ["group"],
//                   array_contains: groupId,
//                 },
//               })),
//             },
//           ],
//         };

//         const combinedCondition = {
//           AND: [
//             {
//               isDeleted: null,
//               id: {
//                 not: excludedId,
//               },
//             },
//             accessCondition,
//             mainCondition,
//           ],
//         };

//         const [data, totalSize] = await Promise.all([
//           this.findMany({
//             where: {
//               ...combinedCondition,
//               id: {
//                 not: excludedId,
//               },
//             },

//             skip: offset,
//             take: pageSize,
//           }),
//           this.count({
//             where: {
//               ...combinedCondition,
//               id: {
//                 not: excludedId,
//               },
//             },
//           }),
//         ]);

//         return { data, totalSize };
//       },

//       // async actFindById(this: any, id: string) {
//       //   const data = await this.findUnique({
//       //     where: {
//       //       id: id,
//       //       isDeleted: null,
//       //     },
//       //     select: {
//       //       id: true,
//       //       username: true,
//       //     },
//       //   });

//       //   return data;
//       // },
//       // async actFindById(this: any, id: string): Promise<UserData> {
//       //   const userData = await this.findUnique({
//       //     where: {
//       //       id: id,
//       //       isDeleted: null,
//       //     },
//       //     select: {
//       //       id: true,
//       //       username: true,
//       //       userRoles: {
//       //         select: {
//       //           id: true,
//       //           name: true,
//       //         },
//       //       },
//       //       userGroups: {
//       //         select: {
//       //           id: true,
//       //           name: true,
//       //         },
//       //       },
//       //     },
//       //   });

//       //   // Extract role IDs and names from userRoles
//       //   const userRoleIds: string[] = userData.userRoles.map(
//       //     (role: any) => role.id
//       //   );
//       //   const userRoleNames: string[] = userData.userRoles.map(
//       //     (role: any) => role.name
//       //   );

//       //   // Extract group IDs and names from userGroups
//       //   const userGroupIds: string[] = userData.userGroups.map(
//       //     (group: any) => group.id
//       //   );
//       //   const userGroupNames: string[] = userData.userGroups.map(
//       //     (group: any) => group.name
//       //   );

//       //   return {
//       //     id: userData.id,
//       //     username: userData.username,
//       //     password: "", // Return an empty string for password for security reasons
//       //     userRole: userRoleIds, // Return array of role IDs
//       //     // roleName: userRoleNames, // Return array of role names
//       //     userGroup: userGroupIds, // Return array of group IDs
//       //     // groupName: userGroupNames, // Return array of group names
//       //   };
//       // },

//       async actCreate(this: any, data: UserData) {
//         if (data.username === "" || data.password === "") {
//           return "User not created";
//         }

//         const rules: BusinessRule[] =
//           await businessRuleModel.businessRule.actFindByFeatureId(
//             "user.create.*"
//           );

//         const readAccess = rules[0].operation.readAccess;
//         const writeAccess = rules[0].operation.writeAccess;

//         const hashedPassword = await bcrypt.hash(data.password, 10);

//         const newData: User = {
//           username: data.username,
//           password: hashedPassword,
//           defaultCompanyId: data.companyUser[0],
//           // readAccess: { ...readAccess },
//           // writeAccess:{...writeAccess},
//           createdAt: new Date(),
//         };

//         if (data?.id) {
//           newData.id = data.id;
//         }

//         const createdUser = await this.create({
//           data: newData,
//         });

//         if (data.userRole.length > 0) {
//           for (const roleId of data.userRole) {
//             const role = await prisma.role.findUnique({
//               where: { id: roleId },
//             });
//             if (role) {
//               const userRole = { userId: createdUser.id, roleId, active: true };
//               await prisma.userRole.actCreate(userRole);
//             } else {
//               return "Role does not exist";
//             }
//           }
//         }

//         if (data.userGroup.length > 0) {
//           for (const groupId of data.userGroup) {
//             const group = await prisma.group.findUnique({
//               where: { id: groupId },
//             });
//             if (group) {
//               const userGroup = {
//                 userId: createdUser.id,
//                 groupId,
//                 active: true,
//               };
//               await prisma.userGroup.actCreate(userGroup);
//             } else {
//               return "Group does not exist";
//             }
//           }
//         }

//         if (data.companyUser.length > 0) {
//           for (const companyId of data.companyUser) {
//             const company = await prisma.company.findUnique({
//               where: { id: companyId },
//             });
//             if (company) {
//               const userCompany = {
//                 userId: createdUser.id,
//                 companyId,
//                 active: true,
//               };
//               await prisma.companyUsers.actCreate(userCompany);
//             } else {
//               return "Company does not exist";
//             }
//           }
//         }

//         return createdUser;
//       },

//       async getLoggedInUser(this: any, id: string) {
//         const user = await userModel.user.findFirst({
//           where: {
//             id: id,
//           },
//         });
//         return user?.username;
//       },

//       async checkPreviousPassowrd(this: any, id: string, password: string) {
//         const user = await prisma.user.actFindById(
//           id,
//           "58c55d6a-910c-46f8-a422-4604bea6cd15"
//         );

//         if (bcrypt.compareSync(password, user.password)) {
//           return true;
//         }

//         return false;
//       },

//       async changePassowrd(this: any, id: string, password: string) {
//         const user = await userModel.user.actFindById(id);
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newData = {
//           username: user.username,
//           password: hashedPassword,
//         };

//         const updated = await prisma.user.actUpdate(id, newData);
//         return updated;
//       },

//       async actUpdate(this: any, id: string, data: UserData) {
//         if (data.username === "") {
//           return "User not updated";
//         }
//         try {
//           const user = await userModel.user.findFirst({
//             where: {
//               id: id,
//             },
//           });

//           let newData: any = {
//             username: data.username,
//             password: user?.password,
//             updatedAt: new Date(),
//           };

//           const updatedUser = await this.update({
//             where: { id: id },
//             data: newData,
//           });

//           // Update user roles
//           await prisma.userRole.deleteMany({
//             where: { userId: id },
//           });

//           for (const roleId of data.userRole) {
//             const role = await prisma.role.findUnique({
//               where: { id: roleId },
//             });
//             if (role) {
//               const userRole = { userId: id, roleId, active: true };
//               await prisma.userRole.create({
//                 data: userRole,
//               });
//             } else {
//               return "Role does not exist";
//             }
//           }

//           // Update user groups
//           await prisma.userGroup.deleteMany({
//             where: { userId: id },
//           });

//           for (const groupId of data.userGroup) {
//             const group = await prisma.group.findUnique({
//               where: { id: groupId },
//             });
//             if (group) {
//               const userGroup = {
//                 userId: id,
//                 groupId,
//                 active: true,
//               };
//               await prisma.userGroup.create({
//                 data: userGroup,
//               });
//             } else {
//               return "Group does not exist";
//             }
//           }

//           await prisma.companyUsers.deleteMany({
//             where: { userId: id },
//           });

//           if (data.companyUser.length > 0) {
//             for (const companyId of data.companyUser) {
//               const company = await prisma.company.findUnique({
//                 where: { id: companyId },
//               });
//               if (company) {
//                 const userCompany = {
//                   userId: updatedUser.id,
//                   companyId,
//                   active: true,
//                 };
//                 await prisma.companyUsers.create({
//                   data: userCompany,
//                 });
//               } else {
//                 return "Company does not exist";
//               }
//             }
//           }

//           return updatedUser;
//         } catch (error) {
//           console.error("Error updating user:", error);
//           return "Error updating user";
//         }
//       },

//       async actFindById(this: any, id: string): Promise<UserData> {
//         const data: UserData[] =
//           await prisma.$queryRaw(Prisma.sql`SELECT "User".username, "User"."defaultCompanyId" , 
//           ARRAY(SELECT DISTINCT "R"."name" FROM "UserRole" AS "UR" LEFT JOIN "Role" AS "R" ON "UR"."roleId" = "R".id WHERE "UR"."userId" = "User".id) AS "userRole", 
//           ARRAY(SELECT DISTINCT "G"."name" FROM "UserGroup" AS "UG" LEFT JOIN "Group" AS "G" ON "UG"."groupId" = "G".id WHERE "UG"."userId" = "User".id) AS "userGroup",
//           ARRAY(SELECT DISTINCT "C"."name" FROM "CompanyUsers" AS "CU" LEFT JOIN "Company" AS "C" ON "CU"."companyId" = "C".id WHERE "CU"."userId" = "User".id) AS "companyUser"
// 		  FROM "User"
//    WHERE "User".id =${id};
//         `);

//         const userData: UserData = {
//           id: data[0].id,
//           username: data[0].username,
//           defaultCompanyId: data[0].defaultCompanyId,
//           password: "",
//           userRole: data[0].userRole,
//           userGroup: data[0].userGroup,
//           companyUser: data[0].companyUser,
//         };

//         return userData;
//       },

//       // async actCreate(this: any, createdData: any) {
//       //   const { password, ...userData } = createdData;

//       //   const hashedPassword = await bcrypt.hash(password, 10);
//       //   const newData = {
//       //     ...userData,
//       //     password: hashedPassword,
//       //     createdAt: new Date(),
//       //   };

//       //   const createdItem = await this.create({
//       //     data: newData,
//       //   });

//       //   return createdItem;
//       // },
//     },
//   },
// });

// export default userModel;
