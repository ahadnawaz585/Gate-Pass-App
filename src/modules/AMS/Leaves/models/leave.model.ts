import { Prisma } from "@prisma/client";
import prisma from "../../../../core/models/base.model";
import path from "path";
import fs from "fs";

const leaveConfigModel = prisma.$extends({
  model: {
    leaveConfiguration:{
        
    }
  },
});
export default leaveConfigModel;
