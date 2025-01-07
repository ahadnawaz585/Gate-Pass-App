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
const cors_1 = __importDefault(require("cors"));
const customer_routes_1 = __importDefault(require("../../modules/app/customer/routes/customer.routes"));
const cookieParser = require("cookie-parser");
const gatePass_routes_1 = __importDefault(require("../../modules/app/gatePass/routes/gatePass.routes"));
const gatePassItem_routes_1 = __importDefault(require("../../modules/app/gatePassItem/routes/gatePassItem.routes"));
const item_routes_1 = __importDefault(require("../../modules/app/item/routes/item.routes"));
const auth_routes_1 = __importDefault(require("../../Auth/routes/auth.routes"));
const path_1 = __importDefault(require("path"));
// import UserDataRoutes from "../../modules/rbac/user/routes/userData.routes";
const user_routes_1 = __importDefault(require("../../modules/rbac/user/routes/user.routes"));
const role_routes_1 = __importDefault(require("../../modules/rbac/role/routes/role.routes"));
const access_routes_1 = __importDefault(require("../../modules/rbac/Access/routes/access.routes"));
const group_routes_1 = __importDefault(require("../../modules/rbac/group/routes/group.routes"));
const routes_helper_1 = __importDefault(require("../../helper/routes.helper"));
const groupRole_routes_1 = __importDefault(require("../../modules/rbac/group/routes/groupRole.routes"));
const userGroup_routes_1 = __importDefault(require("../../modules/rbac/group/routes/userGroup.routes"));
const feature_routes_1 = __importDefault(require("../../modules/rbac/Features/routes/feature.routes"));
const userRole_routes_1 = __importDefault(require("../../modules/rbac/user/routes/userRole.routes"));
const featurePermission_routes_1 = __importDefault(require("../../modules/rbac/Features/routes/featurePermission.routes"));
const schedule_helper_1 = __importDefault(require("../../helper/schedule.helper"));
//AMS
const schedule_helper_2 = __importDefault(require("../../modules/AMS/Attendance/helper/schedule.helper"));
const employee_routes_1 = __importDefault(require("../../modules/AMS/Employee/routes/employee.routes"));
const attendance_routes_1 = __importDefault(require("../../modules/AMS/Attendance/routes/attendance.routes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.helper = routes_helper_1.default;
        this.accessControl();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.startServer();
        schedule_helper_1.default;
        schedule_helper_2.default;
    }
    accessControl() {
        this.app.use((0, cors_1.default)({ origin: true }));
        this.app.use(cookieParser());
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, X-Requested-With, application/json");
            next();
        });
    }
    initializeMiddleware() {
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        ;
        this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
        this.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', '..', 'assets', 'uploads')));
    }
    initializeRoutes() {
        const routes = [
            //App
            customer_routes_1.default,
            gatePass_routes_1.default,
            gatePassItem_routes_1.default,
            item_routes_1.default,
            //Rbac
            group_routes_1.default,
            groupRole_routes_1.default,
            role_routes_1.default,
            user_routes_1.default,
            userGroup_routes_1.default,
            userRole_routes_1.default,
            featurePermission_routes_1.default,
            access_routes_1.default,
            userGroup_routes_1.default,
            feature_routes_1.default,
            //AMS
            employee_routes_1.default,
            attendance_routes_1.default
        ];
        const openRoutes = [auth_routes_1.default];
        const nowInPST = new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" });
        const today = new Date(nowInPST);
        this.app.get("/", (req, res) => {
            res.json({ message: `App is running `,
                format: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
                time: `${new Date()}`,
                PAKTIME: `${today}` });
        });
        this.helper.initializeRoutes(this.app, true, routes);
        this.helper.initializeRoutes(this.app, false, openRoutes);
        // Error handling middleware should be placed after all other middleware and routes
        this.app.use(this.handleErrors.bind(this));
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const port = process.env.PORT || 3001;
            this.app.listen(port, () => {
                console.log(`path:${path_1.default.join(__dirname, '..', '..', 'assets', 'uploads')}`);
                console.log(`Server is running on port ${port}`);
            });
        });
    }
    handleErrors(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send("Something went wrong!");
    }
}
exports.default = App;
