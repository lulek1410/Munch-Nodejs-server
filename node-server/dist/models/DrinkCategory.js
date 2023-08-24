"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Category_1 = require("./common/Category");
const drinkCategoryModel = (0, mongoose_1.model)("drinkCategory", Category_1.CategorySchema);
exports.default = drinkCategoryModel;
