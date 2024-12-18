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
const client_1 = require("@prisma/client");
const gatePassModel = base_model_1.default.$extends({
    model: {
        gatePass: {
            gpCreate(gatePass, gatePassItem) {
                return __awaiter(this, void 0, void 0, function* () {
                    const transaction = yield base_model_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            const createdGatePass = yield prisma.gatePass.gpCreate(gatePass);
                            if (createdGatePass) {
                                yield Promise.all(gatePassItem.map((item) => {
                                    var _a;
                                    return prisma.gatePassItem.create({
                                        data: Object.assign(Object.assign({}, item), { gatePassId: ((_a = createdGatePass[0]) === null || _a === void 0 ? void 0 : _a.id) || "" }),
                                    });
                                }));
                            }
                            return createdGatePass;
                        }
                        catch (error) {
                            throw error;
                        }
                    }));
                    return transaction;
                });
            },
            gpPgFindMany(page, pageSize) {
                return __awaiter(this, void 0, void 0, function* () {
                    const offset = (page - 1) * pageSize;
                    const data = yield base_model_1.default.$queryRaw(client_1.Prisma.sql `
   SELECT
    g.id AS gatePassId,
    c.name AS customerName,
    g."issuedAt",
    g.status,
    g.notes AS gatePassNotes,
    g.location,
    g."vehicleNo",
    g."storeIncharge",
    (
        SELECT json_agg(
            json_build_object(
                'id', i.id,
                'name', i.name,
                'description', i.description,
                'quantity', gpi.quantity,
                'unitPrice', i."unitPrice",
                'serialNos', gpi."serialNos"
            )
        )
        FROM "GatePassItem" gpi
        JOIN "Item" i ON gpi."itemId" = i.id
        WHERE gpi."gatePassId" = g.id
          AND i."isDeleted" IS NULL -- Ensure Item is not deleted
    ) AS items
FROM
    "GatePass" g
JOIN
    "Customer" c ON g."customerId" = c.id
WHERE
    g."isDeleted" IS NULL -- Ensure GatePass is not deleted
    ORDER BY
    g."createdAt" DESC
LIMIT ${pageSize}
OFFSET ${offset};
`);
                    const totalSize = yield this.count({
                        where: {
                            isDeleted: null,
                        },
                    });
                    return { data, totalSize };
                });
            },
            gpPgDeletedFindMany(page, pageSize) {
                return __awaiter(this, void 0, void 0, function* () {
                    const offset = (page - 1) * pageSize;
                    const data = yield base_model_1.default.$queryRaw(client_1.Prisma.sql `
  SELECT
    g.id AS gatePassId,
    c.name AS customerName,
    g."issuedAt",
    g."validUntil",
    g.status,
    g.notes AS gatePassNotes,
    g.location,
    g."vehicleNo",
    g."storeIncharge",
    (
        SELECT json_agg(
            json_build_object(
                'id', i.id,
                'name', i.name,
                'description', i.description,
                'quantity', gpi.quantity,
                'unitPrice', i."unitPrice",
                'serialNos', gpi."serialNos"
            )
        )
        FROM "GatePassItem" gpi
        JOIN "Item" i ON gpi."itemId" = i.id
        WHERE gpi."gatePassId" = g.id
          AND i."isDeleted" IS NOT NULL  -- Ensure Item is not deleted
    ) AS items
FROM
    "GatePass" g
JOIN
    "Customer" c ON g."customerId" = c.id
WHERE
    g."isDeleted" IS NOT NULL  -- Ensure GatePass is not deleted;

`);
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
            gpPgDateFilter(page, pageSize, from, to) {
                return __awaiter(this, void 0, void 0, function* () {
                    const offset = (page - 1) * pageSize;
                    const data = yield base_model_1.default.$queryRaw(client_1.Prisma.sql `
          SELECT
            g.id AS gatePassId,
            c.name AS customerName,
            g."issuedAt",
            g."validUntil",
            g.status,
            g.notes AS gatePassNotes,
            g.location,
            g."vehicleNo",
            g."storeIncharge",
            (
              SELECT json_agg(
                json_build_object(
                  'id', i.id,
                  'name', i.name,
                  'description', i.description,
                  'quantity', gpi.quantity,
                  'unitPrice', i."unitPrice",
                  'serialNos', gpi."serialNos"
                )
              )
              FROM "GatePassItem" gpi
              JOIN "Item" i ON gpi."itemId" = i.id
              WHERE gpi."gatePassId" = g.id
                AND i."isDeleted" IS NULL -- Ensure Item is not deleted
            ) AS items
          FROM
            "GatePass" g
          JOIN
            "Customer" c ON g."customerId" = c.id
          WHERE
            g."isDeleted" IS NULL -- Ensure GatePass is not deleted
            AND g."issuedAt" >= CAST(${from} AS timestamp)
            AND g."issuedAt" <= CAST(${to} AS timestamp)
            `);
                    // LIMIT ${pageSize}
                    // OFFSET ${offset}
                    const response = yield base_model_1.default.$queryRaw(client_1.Prisma.sql `
          SELECT CAST(COUNT(*) AS INTEGER) AS total
          FROM "GatePass" g
          WHERE g."isDeleted" IS NULL -- Ensure GatePass is not deleted
            AND g."issuedAt" >= CAST(${from} AS timestamp)
            AND g."issuedAt" <= CAST(${to} AS timestamp)
        `);
                    const totalSize = response[0].total;
                    return { data, totalSize };
                });
            },
            gpPgStatusFilter(page, pageSize, status) {
                return __awaiter(this, void 0, void 0, function* () {
                    const offset = (page - 1) * pageSize;
                    const data = yield base_model_1.default.$queryRaw(client_1.Prisma.sql `
  SELECT
    g.id AS gatePassId,
    c.name AS customerName,
    g."issuedAt",
    g."validUntil",
    g.status,
    g.notes AS gatePassNotes,
    g.location,
    g."vehicleNo",
    g."storeIncharge",
    (
        SELECT json_agg(
            json_build_object(
                'id', i.id,
                'name', i.name,
                'description', i.description,
                'quantity', gpi.quantity,
                'unitPrice', i."unitPrice",
                'serialNos', gpi."serialNos"
            )
        )
        FROM "GatePassItem" gpi
        JOIN "Item" i ON gpi."itemId" = i.id
        WHERE gpi."gatePassId" = g.id
          AND i."isDeleted" IS NULL -- Ensure Item is not deleted
    ) AS items
FROM
    "GatePass" g
JOIN
    "Customer" c ON g."customerId" = c.id
WHERE
    g."isDeleted" IS NULL -- Ensure GatePass is not deleted
    AND g.status = ${status} -- Replace 'specific_status' with your actual status value
LIMIT ${pageSize}
OFFSET ${offset};


`);
                    const totalSize = yield base_model_1.default.$queryRaw(client_1.Prisma.sql `
  SELECT CAST(COUNT(*) AS INTEGER) AS total_count
FROM "GatePass" g
WHERE g."isDeleted" IS NULL -- Ensure GatePass is not deleted
AND g.status = ${status};
`);
                    return { data, totalSize };
                });
            },
            gpFindById(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const data = yield base_model_1.default.$queryRaw(client_1.Prisma.sql `
      SELECT
      g.id AS gatePassId,
      c.id AS customerId,
      c.name AS customerName,
      g."issuedAt",
      g."validUntil",
      g.status,
      g.notes AS gatePassNotes,
      g.location,
      g."vehicleNo",
      g."storeIncharge",
      (
          SELECT json_agg(
              json_build_object(
                  'id', i.id,
                  'name', i.name,
                  'description', i.description,
                  'quantity', gpi.quantity,
                  'unitPrice', i."unitPrice",
                  'serialNos', gpi."serialNos"
              )
          )
          FROM "GatePassItem" gpi
          JOIN "Item" i ON gpi."itemId" = i.id
          WHERE gpi."gatePassId" = g.id
            AND i."isDeleted" IS NULL 
      ) AS items
    FROM
      "GatePass" g
    JOIN
      "Customer" c ON g."customerId" = c.id
    WHERE
      g.id = ${id} 
      AND g."isDeleted" IS NULL;
        `);
                    return data[0];
                });
            },
            gpFindByCustomerId(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const data = yield base_model_1.default.$queryRaw(client_1.Prisma.sql `
      SELECT
    g.id AS gatePassId,
    c.name AS customerName,
    g."issuedAt",
    g."validUntil",
    g.status,
    g.notes AS gatePassNotes,
    g.location,
    g."vehicleNo",
    g."storeIncharge",
    (
        SELECT json_agg(
            json_build_object(
                'id', i.id,
                'name', i.name,
                'description', i.description,
                'quantity', gpi.quantity,
                'unitPrice', i."unitPrice",
                'serialNos', gpi."serialNos"
            )
        )
        FROM "GatePassItem" gpi
        JOIN "Item" i ON gpi."itemId" = i.id
        WHERE gpi."gatePassId" = g.id
          AND i."isDeleted" IS NULL 
    ) AS items
FROM
    "GatePass" g
JOIN
    "Customer" c ON g."customerId" = c.id
WHERE
    g."isDeleted" IS NULL
    AND c.id = ${id};
        `);
                    return data;
                });
            },
            gpFindByItemId(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    const data = yield base_model_1.default.$queryRaw(client_1.Prisma.sql `
      SELECT
    g.id AS gatePassId,
    c.name AS customerName,
    g."issuedAt",
    g."validUntil",
    g.status,
    g.notes AS gatePassNotes,
    g.location,
    g."vehicleNo",
    g."storeIncharge",
    COALESCE(
        (
            SELECT json_agg(
                json_build_object(
                    'id', i.id,
                    'name', i.name,
                    'description', i.description,
                    'quantity', gpi.quantity,
                    'unitPrice', i."unitPrice",
                    'serialNos', gpi."serialNos"
                )
            )
            FROM "GatePassItem" gpi
            JOIN "Item" i ON gpi."itemId" = i.id
            WHERE gpi."gatePassId" = g.id
              AND i."isDeleted" IS NULL 
              AND i.id = ${id}
        ),
        '[]'::json 
    ) AS items
FROM
    "GatePass" g
JOIN
    "Customer" c ON g."customerId" = c.id
WHERE
    g."isDeleted" IS NULL
    AND EXISTS (
        SELECT 1
        FROM "GatePassItem" gpi
        JOIN "Item" i ON gpi."itemId" = i.id
        WHERE gpi."gatePassId" = g.id
          AND i.id = ${id}
    );
        `);
                    return data;
                });
            },
            gpUpdate(updateId, GatePassData, GatePassItem) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // Update the GatePass and retrieve the updated data
                        const updated = yield base_model_1.default.gatePass.update({
                            where: { id: updateId },
                            data: GatePassData,
                        });
                        // Check if the update was successful and the ID is valid
                        if (!updated || !updated.id) {
                            throw new Error(`Failed to update GatePass with ID ${updateId}`);
                        }
                        // Delete existing GatePassItems associated with the given GatePass
                        yield base_model_1.default.gatePassItem.deleteMany({
                            where: {
                                gatePassId: updateId,
                            },
                        });
                        // Create new GatePassItems
                        if (GatePassItem && GatePassItem.length > 0) {
                            yield Promise.all(GatePassItem.map((item) => base_model_1.default.gatePassItem.create({
                                data: Object.assign(Object.assign({}, item), { gatePassId: updated.id }),
                            })));
                        }
                        return updated;
                    }
                    catch (error) {
                        console.error("Error updating GatePass:", error);
                        throw error;
                    }
                });
            },
            gpApprovePass(id) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const gatePassItems = yield base_model_1.default.gatePassItem.findMany({
                            where: { gatePassId: id },
                        });
                        // Iterate over gate pass items and update quantities
                        for (const gatePassItem of gatePassItems) {
                            const item = yield base_model_1.default.item.findUnique({
                                where: { id: gatePassItem.itemId },
                            });
                            if (!item) {
                                console.log(`Approval failed: Item with ID ${gatePassItem.itemId} not found.`);
                                return {
                                    success: false,
                                    message: `Item with ID ${gatePassItem.itemId} not found.`,
                                };
                            }
                            if (gatePassItem.quantity) {
                                if (item.quantity) {
                                    const remainingQuantity = item.quantity - gatePassItem.quantity;
                                    if (remainingQuantity < 0) {
                                        console.log(`Approval failed: Item ${item.name} has insufficient quantity. Available: ${item.quantity}, Requested: ${gatePassItem.quantity}`);
                                        return {
                                            success: false,
                                            message: `Item ${item.name} has insufficient quantity. Available: ${item.quantity}, Requested: ${gatePassItem.quantity}`,
                                        };
                                    }
                                    yield base_model_1.default.item.update({
                                        where: { id: gatePassItem.itemId },
                                        data: { quantity: remainingQuantity },
                                    });
                                }
                                else {
                                    console.log(`Approval failed: Item ${item.name} does not have a defined quantity.`);
                                    return {
                                        success: false,
                                        message: `Item ${item.name} does not have a defined quantity.`,
                                    };
                                }
                            }
                            else {
                                console.log(`Approval failed: Gate pass item with ID ${gatePassItem.id} does not have a defined quantity.`);
                                return {
                                    success: false,
                                    message: `Gate pass item with ID ${gatePassItem.id} does not have a defined quantity.`,
                                };
                            }
                        }
                        // Update gate pass status after all items have been processed
                        yield base_model_1.default.gatePass.update({
                            where: { id },
                            data: { status: "approved" },
                        });
                        return {
                            success: true,
                            message: "Gate pass approved successfully.",
                        };
                    }
                    catch (error) {
                        console.error("Error approving gate pass:", error);
                        return { success: false, message: "Error approving gate pass." };
                    }
                    finally {
                        yield base_model_1.default.$disconnect();
                    }
                });
            },
            getGatePassesReport() {
                return __awaiter(this, void 0, void 0, function* () {
                    // Array of month abbreviations
                    const monthNames = [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ];
                    // Generate dates for the last 10 months
                    const last10Months = Array.from({ length: 10 }, (_, i) => {
                        const date = new Date();
                        date.setMonth(date.getMonth() - i);
                        return date;
                    }).reverse();
                    const report = yield Promise.all(last10Months.map((date) => __awaiter(this, void 0, void 0, function* () {
                        const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
                        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
                        const count = yield base_model_1.default.gatePass.count({
                            where: {
                                createdAt: {
                                    gte: startDate,
                                    lt: endDate,
                                },
                            },
                        });
                        // Format the month string as YYYY-MMM
                        const monthAbbreviation = monthNames[startDate.getMonth()];
                        return {
                            month: `${startDate.getFullYear()}-${monthAbbreviation}`,
                            count,
                        };
                    })));
                    return report;
                });
            },
        },
    },
});
exports.default = gatePassModel;
