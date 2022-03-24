import db from '../../db'
import {Comment, DBComment } from "../../client/src/types";
import UserService from "./user.service";
import DatabaseError from "../exceptions/database.errors.";
class CommentService {

	public async getAllByReviewId(id: number): Promise<Comment[]> {
		const result = await db.query<DBComment>(
`SELECT * 
				FROM comments 
				WHERE review_id = ${id}`)
		return this.serializeComments(result.rows)
	}

	public async addNew(comment: DBComment): Promise<void> {
		const response = await db.query(`
			INSERT 
			INTO comments (id, author_id, text, review_id, date)
			VALUES (Default, ${comment.author_id}, '${comment.text}', ${comment.review_id}, to_timestamp(${Date.now()} / 1000.0))`)
		if (!response.rowCount) {
			throw DatabaseError.InsertError('Unable to insert comment')
		}
	}

	public async serializeComments(dbComments: DBComment[]): Promise<Comment[]> {
		const userIds = new Set<number>()
		dbComments.forEach(comment => userIds.add(comment.author_id))
		const users = await UserService.getByIds([...userIds])
		return dbComments.map(comment => {
			const commentTmp = {...comment, review_id: undefined, author_id: undefined, }
			return {
				...commentTmp,
				reviewId: comment.review_id,
				user: users.find(user => user.id === comment.author_id),
				date: new Date(comment.date)
			}
		})
	}
}

export default new CommentService()