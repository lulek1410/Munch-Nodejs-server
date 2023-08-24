import { Express, Request, Response } from "express";
import handleDuplicatePropValue from "./ErrorHandler/handleDuplicatePropValue";
import { validateAccessToken } from "../middleware/auth0";
import peopleInfoModel, { PeopleInfo } from "../models/PeopleInfo";

const itemName = "Wydarzenie";

const handlePeopleInfoRouting = (app: Express) => {
	app.get("/peopleInfo", async (req: Request, res: Response) => {
		try {
			const peopleInfo = (await peopleInfoModel.find()) as Array<PeopleInfo>;
			if (req.query.sort) {
				const sortString = req.query.sort as string;
				const sortQuery = sortString
					.substring(1, sortString.length - 1)
					.replace(/"/g, "")
					.split(",");
				const sortBy: string = sortQuery[0];
				const sortDirection = sortQuery[1] === "ASC" ? 1 : -1;
				peopleInfo.sort((a: PeopleInfo, b: PeopleInfo) => {
					return a[sortBy]
						? (a[sortBy] as string).localeCompare(b[sortBy] as string) *
								sortDirection
						: sortDirection;
				});
			}
			const size = peopleInfo.length;
			res.header("Content-Range", `pages 0/${size}/${size}`);
			res.status(200).json(peopleInfo);
		} catch (error: unknown) {
			console.log(error);
			res.status(400).json("Could not GET /peopleInfo");
		}
	});

	app.get("/peopleInfo/:id", async (req: Request, res: Response) => {
		try {
			const result = await peopleInfoModel.findById(req.params.id);
			res.status(200).json(result);
		} catch (error: unknown) {
			console.log(error);
			res.status(400).json(error);
		}
	});

	app.put(
		"/peopleInfo/:id",
		validateAccessToken,
		async (req: Request, res: Response) => {
			try {
				const result = await peopleInfoModel.findByIdAndUpdate(
					req.params.id,
					req.body
				);
				res.status(200).json(req.body);
			} catch (error: unknown) {
				handleDuplicatePropValue(error, res, itemName);
			}
		}
	);
};

export default handlePeopleInfoRouting;
