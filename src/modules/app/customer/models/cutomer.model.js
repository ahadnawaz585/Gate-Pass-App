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
const customerModel = base_model_1.default.$extends({
    model: {
        customer: {
            getCustomersWithMostGatePasses() {
                return __awaiter(this, void 0, void 0, function* () {
                    const limit = 10;
                    const result = yield base_model_1.default.customer.findMany({
                        select: {
                            id: true,
                            name: true,
                            _count: {
                                select: {
                                    gatePasses: true,
                                },
                            },
                        },
                        orderBy: {
                            gatePasses: {
                                _count: "desc",
                            },
                        },
                        take: limit,
                    });
                    return result;
                });
            },
        },
    },
});
exports.default = customerModel;
