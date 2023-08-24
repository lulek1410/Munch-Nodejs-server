import { model } from "mongoose";
import { CategorySchema, Category } from "./common/Category";

const dishCategoryModel = model<Category>("dishCategory", CategorySchema);

export default dishCategoryModel;
