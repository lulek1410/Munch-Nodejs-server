import { model } from "mongoose";
import { CategorySchema, Category } from "./common/Category";

const drinkCategoryModel = model<Category>("drinkCategory", CategorySchema);

export default drinkCategoryModel;
