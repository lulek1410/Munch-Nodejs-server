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
const auth0_1 = require("../middleware/auth0");
const ContactInfo_1 = __importDefault(require("../models/ContactInfo"));
const handleContactInfoRouting = (app) => {
    app.get(`/contactInfo`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const contactInfo = (yield ContactInfo_1.default.find());
            if (req.query.sort) {
                const sortString = req.query.sort;
                const sortQuery = sortString
                    .substring(1, sortString.length - 1)
                    .replace(/"/g, "")
                    .split(",");
                const sortBy = sortQuery[0];
                const sortDirection = sortQuery[1] === "ASC" ? 1 : -1;
                if (sortBy != "openingHours") {
                    contactInfo.sort((a, b) => {
                        return a[sortBy]
                            ? a[sortBy].localeCompare(b[sortBy]) *
                                sortDirection
                            : sortDirection;
                    });
                }
                else {
                    contactInfo.sort((a, b) => {
                        return (a[sortBy].length - b[sortBy].length) * sortDirection;
                    });
                }
            }
            const size = contactInfo.length;
            res.header("Content-Range", `pages 0/${size}/${size}`);
            res.status(200).json(contactInfo);
        }
        catch (error) {
            console.log(error);
            res.status(400).json("Could not GET /contactInfo");
        }
    }));
    app.post(`/contactInfo`, auth0_1.validateAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield ContactInfo_1.default.create(req.body);
            res.status(201).json("OK");
        }
        catch (error) {
            console.log(error);
            if (typeof error === "object" && error != null && "message" in error) {
                res.status(400).json(error.message);
            }
            else {
                res.status(400).json("something went wrong please check logs");
            }
        }
    }));
    app.delete(`/contactInfo`, auth0_1.validateAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ids = req.query.filter.split(`"`).filter((value) => {
                return value.length === 24;
            });
            yield ContactInfo_1.default.deleteMany({ _id: { $in: ids } });
            res.status(200).json("OK");
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }));
    app.delete(`/contactInfo/:id`, auth0_1.validateAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ContactInfo_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json("OK");
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }));
    app.get(`/contactInfo/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ContactInfo_1.default.findById(req.params.id);
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }));
    app.put(`/contactInfo/:id`, auth0_1.validateAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ContactInfo_1.default.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json(req.body);
        }
        catch (error) {
            console.log(error);
            if (typeof error === "object" && error != null && "message" in error) {
                res.status(400).json(error.message);
            }
            else {
                res.status(400).json("something went wrong please check logs");
            }
        }
    }));
};
exports.default = handleContactInfoRouting;
