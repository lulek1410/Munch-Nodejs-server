"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const nocache_1 = __importDefault(require("nocache"));
const handleMenuItemRouting_1 = __importDefault(require("./routing/handleMenuItemRouting"));
const handleCategoriesRouting_1 = __importDefault(require("./routing/handleCategoriesRouting"));
const handleEventRouting_1 = __importDefault(require("./routing/handleEventRouting"));
const DishCategory_1 = __importDefault(require("./models/DishCategory"));
const AlcoholCategory_1 = __importDefault(require("./models/AlcoholCategory"));
const DrinkCategory_1 = __importDefault(require("./models/DrinkCategory"));
const Dish_1 = __importDefault(require("./models/Dish"));
const Drink_1 = __importDefault(require("./models/Drink"));
const Alcohol_1 = __importDefault(require("./models/Alcohol"));
const SoftDrinkCategory_1 = __importDefault(require("./models/SoftDrinkCategory"));
const SoftDrinks_1 = __importDefault(require("./models/SoftDrinks"));
const error_1 = require("./middleware/error");
const not_found_1 = require("./middleware/not-found");
const handleContactInfoRouting_1 = __importDefault(require("./routing/handleContactInfoRouting"));
const compression_1 = __importDefault(require("compression"));
const ContactInfo_1 = __importDefault(require("./models/ContactInfo"));
const Event_1 = __importDefault(require("./models/Event"));
const handlePeopleInfoRouting_1 = __importDefault(require("./routing/handlePeopleInfoRouting"));
const PeopleInfo_1 = __importDefault(require("./models/PeopleInfo"));
if (!(process.env.MONGO_DB && process.env.CLIENT_ORIGIN_URL)) {
    throw new Error("Missing required environment variables. Check docs for more info.");
}
mongoose_1.default.connect(process.env.MONGO_DB);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_ORIGIN_URL,
    allowedHeaders: ["Authorization", "Content-Type"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 86400,
}));
app.use((0, helmet_1.default)({
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
                "https://storage.googleapis.com/",
            ],
            "img-src": [
                "http://localhost:3000",
                "http://localhost:5000",
                "https://storage.googleapis.com/",
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
}));
app.use(express_1.default.json());
app.use((0, nocache_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "front")));
app.get(/^\/$|(\/menu)(\/.*)?|\/order|^\/people$|(\/news)(\/.*)?|^\/contact$|((\/admin)(\/.*)?)/, (req, res) => {
    console.log("serve", path_1.default.resolve(__dirname, "front", "index.html"));
    res.sendFile(path_1.default.resolve(__dirname, "front", "index.html"));
});
(0, handleCategoriesRouting_1.default)(app, "dishes", DishCategory_1.default);
(0, handleCategoriesRouting_1.default)(app, "alcohol", AlcoholCategory_1.default);
(0, handleCategoriesRouting_1.default)(app, "drinks", DrinkCategory_1.default);
(0, handleCategoriesRouting_1.default)(app, "softDrinks", SoftDrinkCategory_1.default);
(0, handleMenuItemRouting_1.default)(app, Dish_1.default, "Jedzenie", "dishes");
(0, handleMenuItemRouting_1.default)(app, Alcohol_1.default, "Alkohol", "alcohol");
(0, handleMenuItemRouting_1.default)(app, Drink_1.default, "Drink", "drinks");
(0, handleMenuItemRouting_1.default)(app, SoftDrinks_1.default, "Napój", "softDrinks");
(0, handleContactInfoRouting_1.default)(app);
(0, handleEventRouting_1.default)(app);
(0, handlePeopleInfoRouting_1.default)(app);
app.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("all");
    try {
        const dishCategories = (yield DishCategory_1.default.find());
        const dishes = (yield Dish_1.default.find());
        const alcoholCategories = (yield AlcoholCategory_1.default.find());
        const alcohol = (yield Alcohol_1.default.find());
        const drinkCategories = (yield DrinkCategory_1.default.find());
        const drinks = (yield Drink_1.default.find());
        const softDrinkCategories = (yield SoftDrinkCategory_1.default.find());
        const softDrinks = (yield SoftDrinks_1.default.find());
        const contactInfo = (yield ContactInfo_1.default.find());
        const events = (yield Event_1.default.find());
        const peopleInfo = (yield PeopleInfo_1.default.find());
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
    }
    catch (error) {
        console.log(error);
        res.status(400).json("Could not GET /all");
    }
}));
app.use(error_1.errorHandler);
app.use(not_found_1.notFoundHandler);
var port = 5000;
app.listen(5000, () => {
    console.log("server listens on 5000");
});
