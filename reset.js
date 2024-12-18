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
const reset_helper_1 = __importDefault(require("./src/helper/reset.helper"));
class Reset {
    constructor() {
        this.resetService = new reset_helper_1.default();
        this.reset();
    }
    reset() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.resetService.resetDB();
                console.log("reseted");
            }
            catch (error) {
                console.error("error reseting ", error);
            }
        });
    }
}
new Reset();
