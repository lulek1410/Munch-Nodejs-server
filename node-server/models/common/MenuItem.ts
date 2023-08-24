import { Schema, model } from "mongoose";

export interface MenuItem {
	[key: string]: string | number | undefined;
	name: string;
	variants?: string;
	description?: string;
	price: string;
	category?: string;
	link?: string;
}

export const menuItemSchema = new Schema<MenuItem>({
	name: { type: String, required: true },
	variants: { type: String },
	description: { type: String },
	price: { type: String, required: true },
	category: { type: String },
	link: { type: String },
});
