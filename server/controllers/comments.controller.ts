import {Request, Response, NextFunction} from 'express'
import CommentService from '../service/comment.service'
import ApiErrors from "../exceptions/api.errors";
import {DBComment} from "../../client/src/types";

class CommentsController {

	public async getAllByReviewId(request: Request, response: Response, next: NextFunction) {
		try {
			const review_id = parseInt(request.params.review_id)
			const comments = await CommentService.getAllByReviewId(review_id)
			if (!comments.length) {
				return next(ApiErrors.BadRequest())
			}
			return response.status(200).json({data: comments})
		}
		catch (error) {
			next(error)
		}
	}

	public async addNewComment(request: Request, response: Response, next: NextFunction) {
		try {
			const comment: DBComment = request.body
			await CommentService.addNew(comment)
			return response.status(201).json({message: 'Success'})
		}
		catch (error) {
			next(error)
		}
	}
}

export default new CommentsController()