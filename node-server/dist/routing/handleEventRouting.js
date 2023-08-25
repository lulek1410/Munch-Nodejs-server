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
const Event_1 = __importDefault(require("../models/Event"));
const handleDuplicatePropValue_1 = __importDefault(require("./ErrorHandler/handleDuplicatePropValue"));
const auth0_1 = require("../middleware/auth0");
const itemName = "Wydarzenie";
const handleEventRouting = (app) => {
    app.get("/events", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const events = (yield Event_1.default.find());
            if (req.query.sort) {
                const sortString = req.query.sort;
                const sortQuery = sortString
                    .substring(1, sortString.length - 1)
                    .replace(/"/g, "")
                    .split(",");
                const sortBy = sortQuery[0];
                const sortDirection = sortQuery[1] === "ASC" ? 1 : -1;
                events.sort((a, b) => {
                    return a[sortBy]
                        ? a[sortBy].localeCompare(b[sortBy]) *
                            sortDirection
                        : sortDirection;
                });
            }
            const size = events.length;
            res.header("Content-Range", `pages 0/${size}/${size}`);
            res.status(200).json(events);
        }
        catch (error) {
            console.log(error);
            res.status(400).json("Could not GET /events");
        }
    }));
    app.post("/events", auth0_1.validateAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Event_1.default.create(Object.assign(Object.assign({}, req.body), { postDate: new Date().toLocaleDateString() }));
            res.status(201).json("OK");
        }
        catch (error) {
            (0, handleDuplicatePropValue_1.default)(error, res, itemName);
        }
    }));
    app.delete("/events", auth0_1.validateAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ids = req.query.filter.split(`"`).filter((value) => {
                return value.length === 24;
            });
            yield Event_1.default.deleteMany({ _id: { $in: ids } });
            res.status(200).json("OK");
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }));
    app.delete("/events/:id", auth0_1.validateAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield Event_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json("OK");
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }));
    app.get("/events/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield Event_1.default.findById(req.params.id);
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }));
    app.put("/events/:id", auth0_1.validateAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield Event_1.default.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json(req.body);
        }
        catch (error) {
            (0, handleDuplicatePropValue_1.default)(error, res, itemName);
        }
    }));
};
exports.default = handleEventRouting;
