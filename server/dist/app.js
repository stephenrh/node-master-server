"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.autoRoutes = require('express-auto-routes')(this.app);
        this.app.use(express_fileupload_1.default());
        this.autoRoutes(path_1.default.join(__dirname, './controllers'));
    }
}
module.exports = new Server();
