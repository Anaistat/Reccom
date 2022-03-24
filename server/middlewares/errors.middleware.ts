import ApiErrors from "../exceptions/api.errors"
import {Request, Response, NextFunction} from 'express'
import DatabaseError from "../exceptions/database.errors.";

export default (error: Error, request: Request, response: Response, next: NextFunction) => {
	console.error(error)
	if(error instanceof ApiErrors) {
		return response.status(error.status).json({ error: error.message, errors: [...error.errors, ...error.validationErrors] })
	}
	if (error instanceof DatabaseError) {
		return response.status(500).json({error: error.message})
	}
	return response.status(500).json({ error: error })
}