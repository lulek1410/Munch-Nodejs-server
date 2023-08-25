"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    priority: { type: Number, required: true, unique: true },
});
