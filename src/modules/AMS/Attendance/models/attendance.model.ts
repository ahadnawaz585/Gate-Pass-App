import prisma from "../../../../core/models/base.model";
import { startOfDay, endOfDay } from "date-fns";

const attendanceModel = prisma.$extends({
  model: {
    attendance: {
      async gpFindMany(this: any) {
        // Calculate start and end of today
        const todayStart = startOfDay(new Date());
        const todayEnd = endOfDay(new Date());

        // Fetch full attendance details with employee data
        const data = await prisma.$queryRaw`
          SELECT 
            a.*,
            e."name" AS "employeeName",
            e."surname" AS "employeeSurname",
            e."designation",
            e."contactNo",
            e."address",
            e."department", 
            e."code" -- Include additional employee fields if needed
          FROM "Attendance" a
          LEFT JOIN "Employee" e 
            ON a."employeeId" = e.id
          WHERE a."isDeleted" IS NULL
            AND a."date" >= ${todayStart}::timestamp
            AND a."date" <= ${todayEnd}::timestamp
        `;

        return data;
      },
    },
  },
});

export default attendanceModel;
