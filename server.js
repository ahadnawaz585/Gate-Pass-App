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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const customer_routes_1 = __importDefault(require("./src/modules/customer/routes/customer.routes"));
const cookieParser = require("cookie-parser");
const gatePass_routes_1 = __importDefault(require("./src/modules/gatePass/routes/gatePass.routes"));
const gatePassItem_routes_1 = __importDefault(require("./src/modules/gatePassItem/routes/gatePassItem.routes"));
const item_routes_1 = __importDefault(require("./src/modules/item/routes/item.routes"));
const auth_routes_1 = __importDefault(require("./src/Auth/routes/auth.routes"));
const routes_helper_1 = __importDefault(require("./src/helper/routes.helper"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.helper = routes_helper_1.default;
        this.accessControl();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.startServer();
    }
    accessControl() {
        // this.app.use(cors());
        this.app.use(cookieParser());
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, X-Requested-With, application/json");
            next();
        });
    }
    initializeMiddleware() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    initializeRoutes() {
        const routes = [
            customer_routes_1.default,
            gatePass_routes_1.default,
            gatePassItem_routes_1.default,
            item_routes_1.default,
        ];
        const openRoutes = [auth_routes_1.default];
        this.app.get("/", (req, res) => {
            res.json({ message: `App is running ` });
        });
        this.helper.initializeRoutes(this.app, true, routes);
        this.helper.initializeRoutes(this.app, false, openRoutes);
        // Error handling middleware should be placed after all other middleware and routes
        this.app.use(this.handleErrors.bind(this));
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const port = process.env.PORT || 3000;
            this.app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        });
    }
    handleErrors(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send("Something went wrong!");
    }
}
new App();
