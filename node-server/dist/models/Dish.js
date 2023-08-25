"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MenuItem_1 = require("./common/MenuItem");
const dishModel = (0, mongoose_1.model)("dish", MenuItem_1.menuItemSchema);
exports.default = dishModel;
