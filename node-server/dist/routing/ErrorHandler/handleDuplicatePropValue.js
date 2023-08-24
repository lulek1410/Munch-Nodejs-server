"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicatePropValue = (error, res, itemName) => {
    let errors = {};
    if (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        "keyPattern" in error &&
        error.keyPattern !== null &&
        typeof error.keyPattern === "object" &&
        error.code === 11000) {
        console.log(error);
        const key = Object.keys(error.keyPattern)[0];
        errors = { [key]: `${itemName} z takim samym parametrem już istnieje` };
        res.status(400).json({ errors });
        return;
    }
    console.log(error);
    res.status(400).json("something went wrong please check logs");
};
exports.default = handleDuplicatePropValue;
