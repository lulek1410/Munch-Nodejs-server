"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const openingHoursSchema = new mongoose_1.Schema({
    day: { type: String, required: true },
    time: { type: String, required: true },
});
const contactInfoSchema = new mongoose_1.Schema({
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    adress: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    tiktok: { type: String },
    openingHours: [openingHoursSchema],
});
const contactInfoModel = (0, mongoose_1.model)("contactInfo", contactInfoSchema);
exports.default = contactInfoModel;
