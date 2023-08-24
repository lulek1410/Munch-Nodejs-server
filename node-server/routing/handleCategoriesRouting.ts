import { Express, Request, Response } from "express";
import handleDuplicatePropValue from "./ErrorHandler/handleDuplicatePropValue";
import { Category } from "../models/common/Category";
import { Model } from "mongoose";
import { validateAccessToken } from "../middleware/auth0";

const itemName = "Kategoria";

const handleCategoriesRouting = (
	app: Express,
	route: String,
	model: Model<Category>
) => {
	app.get(`/${route}/categories`, async (req: Request, res: Response) => {
		try {
			const categories = (await model.find()) as Array<Category>;
			if (req.query.sort) {
				const sortString = req.query.sort as string;
				const sortQuery = sortString
					.substring(1, sortString.length - 1)
					.replace(/"/g, "")
					.split(",");
				const sortBy: string = sortQuery[0];
				const sortDirection = sortQuery[1] === "ASC" ? 1 : -1;
				if (sortBy !== "priority") {
					categories.sort((a: Category, b: Category) => {
						return (
							(a[sortBy] as string).localeCompare(b[sortBy] as string) *
							sortDirection
						);
					});
				} else {
					categories.sort((a: Category, b: Category) => {
						return (
							((a[sortBy] as number) - (b[sortBy] as number)) * sortDirection
						);
					});
				}
			}
			const size = categories.length;
			res.header("Content-Range", `pages 0/${size}/${size}`);
			res.status(200).json(categories);
		} catch (error: unknown) {
			console.log(error);
			res.status(400).json(`Could not GET /${route}/categories/:id`);
		}
	});

	app.post(
		`/${route}/categories`,
		validateAccessToken,
		async (req: Request, res: Response) => {
			try {
				await model.create(req.body);
				res.status(201).json("OK");
			} catch (error: unknown) {
				handleDuplicatePropValue(error, res, itemName);
			}
		}
	);

	app.delete(
		`/${route}/categories/:id`,
		validateAccessToken,
		async (req: Request, res: Response) => {
			try {
				const result = await model.findByIdAndDelete(req.params.id);
				res.status(200).json("OK");
			} catch (error: unknown) {
				console.log(error);
				res.status(400).json(error);
			}
		}
	);

	app.get(`/${route}/categories/:id`, async (req: Request, res: Response) => {
		try {
			const result = await model.findById(req.params.id);
			res.status(200).json(result);
		} catch (error: unknown) {
			console.log(error);
			res.status(400).json(error);
		}
	});

	app.put(
		`/${route}/categories/:id`,
		validateAccessToken,
		async (req: Request, res: Response) => {
			try {
				const result = await model.findByIdAndUpdate(req.params.id, req.body);
				res.status(200).json(req.body);
			} catch (error: unknown) {
				handleDuplicatePropValue(error, res, itemName);
			}
		}
	);
};

export default handleCategoriesRouting;
