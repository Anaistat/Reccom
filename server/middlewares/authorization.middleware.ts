import {Request, Response, NextFunction} from 'express'
import ApiErrors from "../exceptions/api.errors";
import UserService from "../service/user.service";
import {User} from "../../client/src/types";

export default async (request: Request, response: Response, next: NextFunction) => {
	const uid = request.body.uid
	if (!uid || typeof uid !== 'string') {
		return next(ApiErrors.UnauthorizedError())
	}
	const user: User | undefined = await UserService.getByUid(uid)
	if (!user || user.status === 'Block') {
		return next(ApiErrors.UnauthorizedError())
	}
	next()
}