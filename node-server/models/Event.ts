import mongoose, { Schema, model } from "mongoose";

export interface Event {
	[key: string]: string | undefined;
	name: string;
	shortDescription: string;
	description: string;
	translation: string;
	aditionalInfo?: string;
	link: string;
	postDate: string;
}

const eventSchema = new Schema<Event>({
	name: { type: String, required: true, unique: true },
	shortDescription: { type: String, required: true },
	description: { type: String, required: true },
	translation: { type: String, requires: true },
	aditionalInfo: { type: String, required: false },
	link: { type: String, required: true },
	postDate: { type: String, required: true },
});

const eventModel = model<Event>("event", eventSchema);

export default eventModel;
