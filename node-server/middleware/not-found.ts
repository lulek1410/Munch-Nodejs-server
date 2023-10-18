import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	console.log(request);
	const message = "Not Found";

	response.status(404).json({ message });
};
