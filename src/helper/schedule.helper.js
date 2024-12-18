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
const node_schedule_1 = __importDefault(require("node-schedule"));
const token_service_1 = __importDefault(require("../modules/rbac/Token/service/token.service"));
class TokenCleanupHelper {
    constructor() {
        this.tokenService = new token_service_1.default();
        this.cleanupTask = node_schedule_1.default.scheduleJob("*/1 * * * *", this.cleanup.bind(this));
    }
    cleanup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const sixMonth = new Date();
                sixMonth.setDate(sixMonth.getDate() - 183);
                this.tokenService.deleteToken(yesterday, sixMonth);
            }
            catch (error) {
                console.error("Error cleaning up expired tokens:", error);
            }
        });
    }
}
exports.default = new TokenCleanupHelper();
