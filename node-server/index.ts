import "dotenv/config";

import path from "path";

import mongoose from "mongoose";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import nocache from "nocache";

import handleMenuItemRouting from "./routing/handleMenuItemRouting";
import handleCategoriesRouting from "./routing/handleCategoriesRouting";
import handleEventRouting from "./routing/handleEventRouting";
import dishCategoryModel from "./models/DishCategory";
import alcoholCategoryModel from "./models/AlcoholCategory";
import drinkCategoryModel from "./models/DrinkCategory";
import dishModel from "./models/Dish";
import drinkModel from "./models/Drink";
import alcoholModel from "./models/Alcohol";
import softDrinkCategoryModel from "./models/SoftDrinkCategory";
import softDrinkModel from "./models/SoftDrinks";
import { errorHandler } from "./middleware/error";
import { notFoundHandler } from "./middleware/not-found";
import handleContactInfoRouting from "./routing/handleContactInfoRouting";
import compression from "compression";
import { Category } from "./models/common/Category";
import { MenuItem } from "./models/common/MenuItem";
import contactInfoModel, { ContactInfo } from "./models/ContactInfo";
import eventModel from "./models/Event";
import handlePeopleInfoRouting from "./routing/handlePeopleInfoRouting";
import peopleInfoModel, { PeopleInfo } from "./models/PeopleInfo";

if (!(process.env.MONGO_DB && process.env.CLIENT_ORIGIN_URL)) {
	throw new Error(
		"Missing required environment variables. Check docs for more info."
	);
}

mongoose.connect(process.env.MONGO_DB);

const app: Express = express();

app.use(
	cors({
		origin: process.env.CLIENT_ORIGIN_URL,
		allowedHeaders: ["Authorization", "Content-Type"],
		exposedHeaders: ["Content-Range", "X-Content-Range"],
		maxAge: 86400,
	})
);

app.use(
	helmet({
		hsts: {
			maxAge: 31536000,
		},
		contentSecurityPolicy: {
			useDefaults: false,
			directives: {
				"default-src": ["'none'"],
				connectSrc: [
					"'self'",
					"https://dev-pxa53vcvn23hiwzr.eu.auth0.com/",
					"http://localhost:3000",
					"http://localhost:5000",
					"https://api.i18nexus.com/",
				],
				"img-src": [
					"http://localhost:3000",
					"http://localhost:5000",
					"https://react-admin-telemetry.marmelab.com/",
					"https://s.gravatar.com/avatar/",
					"https://i2.wp.com/",
					"https://i.postimg.cc/",
				],
				"script-src-elem": ["http://localhost:3000", "http://localhost:5000"],
				"style-src-elem": [
					"http://localhost:3000",
					"http://localhost:5000",
					"'unsafe-inline'",
				],
				"style-src": ["http://localhost:5000", "'unsafe-inline'"],
				"manifest-src": ["http://localhost:3000", "http://localhost:5000"],
				"frame-ancestors": ["'none'"],
				"frame-src": ["https://dev-pxa53vcvn23hiwzr.eu.auth0.com/"],
			},
		},
		frameguard: {
			action: "deny",
		},
	})
);

app.use(express.json());
app.use(nocache());
app.use(compression());
app.use(express.static(path.join(__dirname, "front")));

app.get(
	/^(menu(\/.*)?|order|people|news(\/.*)?|contact|admin(\/.*)?)$/,
	(req: Request, res: Response) => {
		res.sendFile(path.resolve(__dirname, "front", "index.html"));
	}
);

handleCategoriesRouting(app, "dishes", dishCategoryModel);
handleCategoriesRouting(app, "alcohol", alcoholCategoryModel);
handleCategoriesRouting(app, "drinks", drinkCategoryModel);
handleCategoriesRouting(app, "softDrinks", softDrinkCategoryModel);

handleMenuItemRouting(app, dishModel, "Jedzenie", "dishes");
handleMenuItemRouting(app, alcoholModel, "Alkohol", "alcohol");
handleMenuItemRouting(app, drinkModel, "Drink", "drinks");
handleMenuItemRouting(app, softDrinkModel, "Napój", "softDrinks");

handleContactInfoRouting(app);
handleEventRouting(app);
handlePeopleInfoRouting(app);
app.get("/all", async (req: Request, res: Response) => {
	try {
		const dishCategories = (await dishCategoryModel.find()) as Array<Category>;
		const dishes = (await dishModel.find()) as Array<MenuItem>;

		const alcoholCategories =
			(await alcoholCategoryModel.find()) as Array<Category>;
		const alcohol = (await alcoholModel.find()) as Array<MenuItem>;

		const drinkCategories =
			(await drinkCategoryModel.find()) as Array<Category>;
		const drinks = (await drinkModel.find()) as Array<MenuItem>;

		const softDrinkCategories =
			(await softDrinkCategoryModel.find()) as Array<Category>;
		const softDrinks = (await softDrinkModel.find()) as Array<MenuItem>;

		const contactInfo = (await contactInfoModel.find()) as Array<ContactInfo>;
		const events = (await eventModel.find()) as Array<Event>;
		const peopleInfo = (await peopleInfoModel.find()) as Array<PeopleInfo>;

		res.status(200).json({
			food: {
				dishes: { categories: dishCategories, elements: dishes },
				alcohol: { categories: alcoholCategories, elements: alcohol },
				drinks: { categories: drinkCategories, elements: drinks },
				softDrinks: { categories: softDrinkCategories, elements: softDrinks },
			},
			contactInfo: contactInfo,
			events: events,
			peopleInfo: peopleInfo,
		});
	} catch (error: unknown) {
		console.log(error);
		res.status(400).json("Could not GET /all");
	}
});

app.use(errorHandler);
app.use(notFoundHandler);

var port = 5000;

app.listen(5000, () => {
	console.log("server listens ad 5000");
});
