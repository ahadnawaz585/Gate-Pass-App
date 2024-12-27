import prisma from "../../../../core/models/base.model";
import { Prisma } from "@prisma/client";
import path from "path";
import fs from "fs";

const attendanceModel = prisma.$extends({
  model: {
    attendance: {


    },
  },
});

export default attendanceModel
