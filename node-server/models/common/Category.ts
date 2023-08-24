import { Schema } from "mongoose";

export interface Category {
	[key: string]: string | number;
	name: string;
	priority: number;
}

export const CategorySchema = new Schema<Category>({
	name: { type: String, required: true, unique: true },
	priority: { type: Number, required: true, unique: true },
});
