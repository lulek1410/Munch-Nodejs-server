"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    translation: { type: String, requires: true },
    aditionalInfo: { type: String, required: false },
    link: { type: String, required: true },
    postDate: { type: String, required: true },
});
const eventModel = (0, mongoose_1.model)("event", eventSchema);
exports.default = eventModel;
