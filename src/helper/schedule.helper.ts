import schedule from "node-schedule";
import prisma from "../core/models/base.model";
import { cpSync } from "fs";
import BlackListedTokenService from "../modules/rbac/Token/service/token.service";
import { getCurrentTimeInPST } from "./date.helper";

class TokenCleanupHelper {
  private cleanupTask: schedule.Job;
  private tokenService: BlackListedTokenService = new BlackListedTokenService();

  constructor() {
    this.cleanupTask = schedule.scheduleJob(
      "*/1 * * * *",
      this.cleanup.bind(this)
    );
  }

  private async cleanup() {
    try {
      const yesterday = getCurrentTimeInPST();
      yesterday.setDate(yesterday.getDate() - 1);
      const sixMonth = getCurrentTimeInPST();
      sixMonth.setDate(sixMonth.getDate() - 183);
      this.tokenService.deleteToken(yesterday, sixMonth);
    } catch (error) {
      console.error("Error cleaning up expired tokens:", error);
    }
  }
}

export default new TokenCleanupHelper();
