import { model } from "mongoose";
import { CategorySchema, Category } from "./common/Category";

const softDrinkCategoryModel = model<Category>(
	"softDrinkCategory",
	CategorySchema
);

export default softDrinkCategoryModel;
