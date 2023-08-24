"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Category_1 = require("./common/Category");
const dishCategoryModel = (0, mongoose_1.model)("dishCategory", Category_1.CategorySchema);
exports.default = dishCategoryModel;
