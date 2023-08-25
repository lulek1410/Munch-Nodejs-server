"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.menuItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    quantity: { type: String },
    description: { type: String },
    price: { type: String, required: true },
    category: { type: String },
    link: { type: String },
});
