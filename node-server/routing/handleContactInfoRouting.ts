import { Express, Request, Response } from "express";
import { validateAccessToken } from "../middleware/auth0";
import contactInfoModel, { ContactInfo } from "../models/ContactInfo";

const handleContactInfoRouting = (app: Express) => {
	app.get(`/contactInfo`, async (req: Request, res: Response) => {
		try {
			const contactInfo = (await contactInfoModel.find()) as Array<ContactInfo>;
			if (req.query.sort) {
				const sortString = req.query.sort as string;
				const sortQuery = sortString
					.substring(1, sortString.length - 1)
					.replace(/"/g, "")
					.split(",");
				const sortBy: string = sortQuery[0];
				const sortDirection = sortQuery[1] === "ASC" ? 1 : -1;
				if (sortBy != "openingHours") {
					contactInfo.sort((a: ContactInfo, b: ContactInfo) => {
						return a[sortBy]
							? (a[sortBy] as string).localeCompare(b[sortBy] as string) *
									sortDirection
							: sortDirection;
					});
				} else {
					contactInfo.sort((a: ContactInfo, b: ContactInfo) => {
						return (a[sortBy].length - b[sortBy].length) * sortDirection;
					});
				}
			}
			const size = contactInfo.length;
			res.header("Content-Range", `pages 0/${size}/${size}`);
			res.status(200).json(contactInfo);
		} catch (error: unknown) {
			console.log(error);
			res.status(400).json("Could not GET /contactInfo");
		}
	});

	app.get(`/contactInfo/:id`, async (req: Request, res: Response) => {
		try {
			const result = await contactInfoModel.findById(req.params.id);
			res.status(200).json(result);
		} catch (error: unknown) {
			console.log(error);
			res.status(400).json(error);
		}
	});

	app.put(
		`/contactInfo/:id`,
		validateAccessToken,
		async (req: Request, res: Response) => {
			try {
				const result = await contactInfoModel.findByIdAndUpdate(
					req.params.id,
					req.body
				);
				res.status(200).json(req.body);
			} catch (error: unknown) {
				console.log(error);
				if (typeof error === "object" && error != null && "message" in error) {
					res.status(400).json(error.message);
				} else {
					res.status(400).json("something went wrong please check logs");
				}
			}
		}
	);
};

export default handleContactInfoRouting;
