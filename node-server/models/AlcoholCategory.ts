import { model } from "mongoose";
import { CategorySchema, Category } from "./common/Category";

const alcoholCategoryModel = model<Category>("alcoholCategory", CategorySchema);

export default alcoholCategoryModel;
