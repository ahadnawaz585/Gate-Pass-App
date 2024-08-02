import prisma from "../../../core/models/base.model";
import { Prisma } from "@prisma/client";
import { Status } from "../../../enums/schema";
import { DetailedGatePass } from "../../../types/paginatedData";

const gatePassModel = prisma.$extends({
  model: {
    gatePass: {
      async gpPgFindMany(this: any, page: number, pageSize: number) {
        const offset = (page - 1) * pageSize;
        const data = await prisma.$queryRaw(Prisma.sql`
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
LIMIT ${pageSize}
OFFSET ${offset};
`);

        const totalSize: number = await this.count({
          where: {
            isDeleted: null,
          },
        });

        return { data, totalSize };
      },
      
      async gpPgDeletedFindMany(this: any, page: number, pageSize: number) {
        const offset = (page - 1) * pageSize;
        const data = await prisma.$queryRaw(Prisma.sql`
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
          AND i."isDeleted" IS NOT NULL; -- Ensure Item is not deleted
    ) AS items
FROM
    "GatePass" g
JOIN
    "Customer" c ON g."customerId" = c.id
WHERE
    g."isDeleted" IS NOT NULL; -- Ensure GatePass is not deleted
LIMIT ${pageSize}
OFFSET ${offset};
`);

        const totalSize: number = await this.count({
          where: {
            isDeleted: null,
          },
        });

        return { data, totalSize };
      },

      async gpPgDateFilter(
        this: any,
        page: number,
        pageSize: number,
        from: Date,
        to: Date
      ) {
        const offset = (page - 1) * pageSize;
        const data = await prisma.$queryRaw(Prisma.sql`
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
          LIMIT ${pageSize}
          OFFSET ${offset}
        `);

        const response: { total: number }[] = await prisma.$queryRaw(Prisma.sql`
          SELECT CAST(COUNT(*) AS INTEGER) AS total
          FROM "GatePass" g
          WHERE g."isDeleted" IS NULL -- Ensure GatePass is not deleted
            AND g."issuedAt" >= CAST(${from} AS timestamp)
            AND g."issuedAt" <= CAST(${to} AS timestamp)
        `);
        const totalSize = response[0].total;
        return { data, totalSize };
      },

      async gpPgStatusFilter(
        this: any,
        page: number,
        pageSize: number,
        status: Status
      ) {
        const offset = (page - 1) * pageSize;
        const data = await prisma.$queryRaw(Prisma.sql`
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

        const totalSize: number = await prisma.$queryRaw(Prisma.sql`
  SELECT CAST(COUNT(*) AS INTEGER) AS total_count
FROM "GatePass" g
WHERE g."isDeleted" IS NULL -- Ensure GatePass is not deleted
AND g.status = ${status};
`);

        return { data, totalSize };
      },

      async gpFindById(this: any, id: string): Promise<DetailedGatePass> {
        const data: DetailedGatePass[] = await prisma.$queryRaw(Prisma.sql`
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
      g.id = ${id} 
      AND g."isDeleted" IS NULL;
        `);

        return data[0];
      },

      async gpFindByCustomerId(
        this: any,
        id: string
      ): Promise<DetailedGatePass[]> {
        const data: DetailedGatePass[] = await prisma.$queryRaw(Prisma.sql`
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
      },

      async gpFindByItemId(this: any, id: string): Promise<DetailedGatePass[]> {
        const data: DetailedGatePass[] = await prisma.$queryRaw(Prisma.sql`
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
      },

      async gpApprovePass(id: string) {
        try {
          const updatedPass = await prisma.gatePass.update({
            where: { id },
            data: { status: "approved" },
          });
        } catch (error) {
          console.error("Error approving gate pass:", error);
        } finally {
          await prisma.$disconnect();
        }
      },
    },
  },
});

export default gatePassModel;
