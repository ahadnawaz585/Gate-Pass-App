"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = __importDefault(require("../middleware/authentication"));
class RoutesHelper {
    static generateRoutePath(route) {
        const routeName = route.name.replace('Routes', '');
        return `/${routeName.charAt(0).toLowerCase()}${routeName.slice(1)}`;
    }
    static initializeRoutes(app, authenticated, routes) {
        if (authenticated) {
            routes.forEach((route) => {
                const routePath = this.generateRoutePath(route);
                const router = new route().getRouter();
                app.use(routePath, authentication_1.default.authenticateToken, router);
            });
        }
        else {
            routes.forEach((route) => {
                const routePath = this.generateRoutePath(route);
                const router = new route().getRouter();
                app.use(routePath, router);
            });
        }
    }
}
exports.default = RoutesHelper;
