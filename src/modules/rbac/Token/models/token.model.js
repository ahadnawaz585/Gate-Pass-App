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
const blacklistTokenModel = base_model_1.default.$extends({
    model: {
        blacklistToken: {
            gpBlackListToken(token, userId) {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield this.create({
                        data: {
                            token,
                            userId,
                            createdAt: new Date(),
                        },
                    });
                    return result;
                });
            },
            isTokenBlacklisted(token) {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield this.findUnique({
                        where: {
                            token,
                        },
                    });
                    return !!result;
                });
            },
            gpDeleteTokenBlackListed(yesterday, sixMonth) {
                return __awaiter(this, void 0, void 0, function* () {
                    // console.log("deleting yesterday :" ,yesterday.toLocaleString());
                    yield base_model_1.default.blacklistToken.deleteMany({
                        where: {
                            rememberMe: false,
                            createdAt: {
                                lt: yesterday,
                            },
                        },
                    });
                    // console.log("deleting 6 month :" ,sixMonth.toLocaleString());
                    yield base_model_1.default.blacklistToken.deleteMany({
                        where: {
                            rememberMe: true,
                            createdAt: {
                                lt: sixMonth,
                            },
                        },
                    });
                });
            }
        },
    },
});
exports.default = blacklistTokenModel;
