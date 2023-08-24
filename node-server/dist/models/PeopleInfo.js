"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const peopleInfoSchema = new mongoose_1.Schema({
    description: { type: String, required: true },
    link: { type: String, required: true },
});
const peopleInfoModel = (0, mongoose_1.model)("peopleInfo", peopleInfoSchema);
exports.default = peopleInfoModel;
