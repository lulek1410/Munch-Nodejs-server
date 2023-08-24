import mongoose, { Schema, model } from "mongoose";

export interface PeopleInfo {
	[key: string]: string;
	link: string;
	description: string;
}

const peopleInfoSchema = new Schema<PeopleInfo>({
	description: { type: String, required: true },
	link: { type: String, required: true },
});

const peopleInfoModel = model<PeopleInfo>("peopleInfo", peopleInfoSchema);

export default peopleInfoModel;
