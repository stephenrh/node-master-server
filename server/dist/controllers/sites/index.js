"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const unzip_1 = __importDefault(require("unzip"));
const util_1 = require("util");
const fs_2 = require("fs");
const rimraf_1 = __importDefault(require("rimraf"));
class SiteController {
    constructor() {
        this.get = (...args) => __awaiter(this, void 0, void 0, function* () {
            return args[1].send(yield this.installedSites());
        });
        this.post = (...args) => __awaiter(this, void 0, void 0, function* () {
            const request = util_1.inspect(args[0]);
            const file = args[0].files.file;
            if (file.mimetype !== 'application/x-zip-compressed') {
                return args[1].status(400).json('Incorrect File Type');
            }
            yield file.mv('./tmp.zip');
            const fileStream = fs_1.default.createReadStream('./tmp.zip');
            fileStream.pipe(unzip_1.default.Extract({ path: './sites/test.site.io' })).on('close', (...args) => {
                fs_1.default.readdir('./sites/test.site.io', (err, files) => {
                    if (files.indexOf('site.config.json') === -1) {
                        rimraf_1.default('./sites/test.site.io', err => {
                            console.log('Unlinked');
                        });
                    }
                });
            });
        });
    }
    installedSites() {
        return __awaiter(this, void 0, void 0, function* () {
            const siteDir = './sites';
            const dirs = yield fs_2.promises.readdir(siteDir);
            let rootSites = [];
            let subSites = [];
            let rootSiteCount = 0;
            for (const dir of dirs) {
                let siteObj = { root: null, sub: [] };
                const configFile = path_1.default.join(`${siteDir}/${dir}/site.config.json`);
                try {
                    const rawConfig = yield fs_2.promises.readFile(configFile);
                    const jsonConfig = JSON.parse(rawConfig.toString());
                    siteObj.root = jsonConfig;
                    const subDirs = yield fs_2.promises.readdir(`${siteDir}/${dir}`);
                    for (const subDir of subDirs) {
                        if ((yield fs_2.promises.stat(path_1.default.join(`${siteDir}/${dir}/${subDir}`))).isDirectory()) {
                            try {
                                console.log('READING IN: ', `${siteDir}/${dir}/${subDir}/site.config.json`);
                                const rawSubConfig = yield fs_2.promises.readFile(`${siteDir}/${dir}/${subDir}/site.config.json`);
                                const jsonSubConfig = JSON.parse(rawSubConfig.toString());
                                console.log('Adding sub to: ', rootSites[rootSiteCount]);
                                siteObj.sub.push(jsonSubConfig);
                            }
                            catch (err) {
                                console.log('must be something else...', err);
                                continue;
                            }
                        }
                        else {
                            console.log(`Looks like ${subDir} is a file`);
                        }
                    }
                    console.log(subDirs);
                }
                catch (err) {
                    console.log(err);
                    continue;
                }
                rootSites.push(siteObj);
                rootSiteCount++;
            }
            return { rootSites };
        });
    }
}
module.exports = new SiteController();
