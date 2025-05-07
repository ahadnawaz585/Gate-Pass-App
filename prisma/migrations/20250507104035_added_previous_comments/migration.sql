UPDATE "Attendance" 
SET "comment" = 
  CASE 
    WHEN "status" = 'PRESENT' THEN 
      CONCAT(
        (SELECT CONCAT("name", ' ', "surname") 
         FROM "Employee" 
         WHERE "Employee"."id" = "Attendance"."employeeId"), 
        ' was present on ', 
        TO_CHAR("date", 'DD/Mon/YYYY'), 
        ' and checked in at ', 
        COALESCE(TO_CHAR("checkIn", 'HH24:MI'), 'no check-in time'), 
        ' and checked out at ', 
        COALESCE(TO_CHAR("checkOut", 'HH24:MI'), 'no check-out time')
      )
    WHEN "status" = 'ABSENT' THEN 
      CONCAT(
        (SELECT CONCAT("name", ' ', "surname") 
         FROM "Employee" 
         WHERE "Employee"."id" = "Attendance"."employeeId"), 
        ' was absent on ', 
        TO_CHAR("date", 'DD/Mon/YYYY')
      )
    WHEN "status" = 'LATE' THEN 
      CONCAT(
        (SELECT CONCAT("name", ' ', "surname") 
         FROM "Employee" 
         WHERE "Employee"."id" = "Attendance"."employeeId"), 
        ' was late on ', 
        TO_CHAR("date", 'DD/Mon/YYYY'), 
        ' and checked in at ', 
        COALESCE(TO_CHAR("checkIn", 'HH24:MI'), 'no check-in time')
      )
    WHEN "status" = 'ON_LEAVE' THEN 
      CONCAT(
        (SELECT CONCAT("name", ' ', "surname") 
         FROM "Employee" 
         WHERE "Employee"."id" = "Attendance"."employeeId"), 
        ' was on leave on ', 
        TO_CHAR("date", 'DD/Mon/YYYY')
      )
    WHEN "status" = 'HALF_DAY' THEN 
      CONCAT(
        (SELECT CONCAT("name", ' ', "surname") 
         FROM "Employee" 
         WHERE "Employee"."id" = "Attendance"."employeeId"), 
        ' worked half day on ', 
        TO_CHAR("date", 'DD/Mon/YYYY'), 
        ' and checked in at ', 
        COALESCE(TO_CHAR("checkIn", 'HH24:MI'), 'no check-in time'), 
        ' and checked out at ', 
        COALESCE(TO_CHAR("checkOut", 'HH24:MI'), 'no check-out time')
      )
    WHEN "status" = 'HOLIDAYS' THEN 
      CONCAT(
        (SELECT CONCAT("name", ' ', "surname") 
         FROM "Employee" 
         WHERE "Employee"."id" = "Attendance"."employeeId"), 
        ' was on holiday on ', 
        TO_CHAR("date", 'DD/Mon/YYYY')
      )
    ELSE 'No comment available'
  END
WHERE "comment" IS NULL;