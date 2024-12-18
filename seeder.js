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
const seeder_helper_1 = __importDefault(require("./src/helper/seeder.helper"));
const reset_helper_1 = __importDefault(require("./src/helper/reset.helper"));
class Seeder {
    constructor(force) {
        this.resetHelper = new reset_helper_1.default();
        this.seederService = new seeder_helper_1.default();
        if (force) {
            this.reset();
            setTimeout(() => {
                this.startSeeding();
            }, 1000);
        }
        else {
            this.startSeeding();
        }
    }
    startSeeding() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.seederService.Seeder();
        });
    }
    reset() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.resetHelper.resetDB();
                console.log("reseted");
            }
            catch (error) {
                console.error("error reseting ", error);
            }
        });
    }
}
const forceIndex = process.argv.indexOf("--force");
if (forceIndex !== -1) {
    new Seeder(true);
}
else {
    new Seeder(false);
}
