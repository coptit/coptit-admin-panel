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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var server_1 = require("@trpc/server");
var standalone_1 = require("@trpc/server/adapters/standalone");
var cors_1 = __importDefault(require("cors"));
var zod_1 = require("zod");
var sendMail_1 = __importDefault(require("./sendMail"));
var express_1 = __importDefault(require("express"));
var t = server_1.initTRPC.create();
var publicProcedure = t.procedure;
var router = t.router;
var appRouter = router({
    sendmail: publicProcedure
        .input(zod_1.z.object({
        to: zod_1.z.string().email().nonempty(),
        subject: zod_1.z.string().nonempty(),
        text: zod_1.z.string().nullish(),
        html: zod_1.z.string().nullish()
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var mailmeta, messageid;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        mailmeta = {
                            to: input.to,
                            subject: input.subject,
                            text: (_b = input.text) !== null && _b !== void 0 ? _b : "",
                            html: (_c = input.text) !== null && _c !== void 0 ? _c : ""
                        };
                        return [4 /*yield*/, (0, sendMail_1["default"])(mailmeta)];
                    case 1:
                        messageid = _d.sent();
                        return [2 /*return*/, {
                                messageid: messageid
                            }];
                }
            });
        });
    }),
    auth: publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string().email().nonempty(),
        password: zod_1.z.string().nonempty()
    }))
        .mutation(function (_a) {
        var input = _a.input;
        var auth = false;
        if (input.email === process.env.ADMIN_USER &&
            input.password === process.env.ADMIN_PASS) {
            auth = true;
        }
        return {
            auth: auth
        };
    }),
    getAllChannels: publicProcedure.query(function () { return __awaiter(void 0, void 0, void 0, function () {
        var botToken, guildId, res, data, response, _i, data_1, channel, text, announcement, announcementThread, publicThreads, privateThreads, channelInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    botToken = process.env.BOT_TOKEN;
                    guildId = process.env.GUILD_ID;
                    return [4 /*yield*/, fetch("https://discord.com/api/v10/guilds/".concat(guildId, "/channels"), {
                            method: "GET",
                            headers: {
                                Authorization: "Bot " + botToken
                            }
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    response = [];
                    for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                        channel = data_1[_i];
                        text = 0;
                        announcement = 5;
                        announcementThread = 10;
                        publicThreads = 11;
                        privateThreads = 13;
                        if (!(channel.type === text ||
                            channel.type === announcement ||
                            channel.type === announcementThread ||
                            channel.type === publicThreads ||
                            channel.type === privateThreads)) {
                            continue;
                        }
                        channelInfo = {
                            id: channel.id,
                            type: channel.type,
                            name: channel.name
                        };
                        response.push(channelInfo);
                    }
                    return [2 /*return*/, {
                            channels: JSON.stringify(response)
                        }];
            }
        });
    }); }),
    sendMessage: publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string().nonempty(),
        content: zod_1.z.string().nonempty()
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var botToken, res, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        botToken = process.env.BOT_TOKEN;
                        return [4 /*yield*/, fetch("https://discord.com/api/v10/channels/".concat(input.id, "/messages"), {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bot " + botToken
                                },
                                body: input.content
                            })];
                    case 1:
                        res = _b.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _b.sent();
                        return [2 /*return*/, {
                                response: JSON.stringify(data)
                            }];
                }
            });
        });
    })
});
(0, standalone_1.createHTTPServer)({
    middleware: (0, cors_1["default"])(),
    router: appRouter,
    createContext: function () {
        return {};
    }
}).listen(4001);
console.log("Started TRPC server at 4001");
/*
Server for REST API Endpoints
*/
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])({
    origin: "*"
}));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.post("/api/sendmail", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var to, subject, text, html, mailPayload, messageid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                to = req.body.to;
                subject = req.body.subject;
                text = req.body.text;
                html = req.body.html;
                mailPayload = {
                    to: to,
                    subject: subject,
                    text: text,
                    html: html
                };
                return [4 /*yield*/, (0, sendMail_1["default"])(mailPayload)];
            case 1:
                messageid = _a.sent();
                res.status(200);
                res.json({
                    messageid: messageid
                });
                return [2 /*return*/];
        }
    });
}); });
app.listen(4002, function () {
    console.log("REST App listening at port 4002");
});
