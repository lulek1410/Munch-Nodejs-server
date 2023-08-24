import { Schema, model } from "mongoose";

interface OpeningHours {
	day: string;
	time: string;
}

export interface ContactInfo {
	[key: string]: string | Array<OpeningHours>;
	phoneNumber: string;
	email: string;
	adress: string;
	facebook: string;
	instagram: string;
	tiktok: string;
	openingHours: Array<OpeningHours>;
}

const openingHoursSchema = new Schema<OpeningHours>({
	day: { type: String, required: true },
	time: { type: String, required: true },
});

const contactInfoSchema = new Schema<ContactInfo>({
	phoneNumber: { type: String, required: true },
	email: { type: String, required: true },
	adress: { type: String },
	facebook: { type: String },
	instagram: { type: String },
	tiktok: { type: String },
	openingHours: [openingHoursSchema],
});

const contactInfoModel = model<ContactInfo>("contactInfo", contactInfoSchema);

export default contactInfoModel;
