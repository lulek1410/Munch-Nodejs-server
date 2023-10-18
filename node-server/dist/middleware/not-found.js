"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const notFoundHandler = (request, response, next) => {
    console.log(request);
    const message = "Not Found";
    response.status(404).json({ message });
};
exports.notFoundHandler = notFoundHandler;
