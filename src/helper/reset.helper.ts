import { PrismaClient } from "@prisma/client";
import prisma from "../core/models/base.model";
import { tableNames } from "../static/staticData";

class ResetHelper {
  private prisma = new PrismaClient();
  async resetDB() {
    try {
      for (const tableName of tableNames) {
        await prisma.$queryRawUnsafe(`DELETE FROM "${tableName}";`);
        console.log(`Table ${tableName} has been reset.`);
      }
    } catch (err) {
      console.error("Error resetting tables:", err);
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default ResetHelper;
