import db from "../../db"
import {DBReview, Review} from "../../client/src/types";
import ProductService from "./product.service";
import UserService from "./user.service";
import ApiErrors from "../exceptions/api.errors";
import DatabaseError from "../exceptions/database.errors.";

export default class ReviewService{

    static async getAllTags(): Promise<string[]> {
        let result = await db.query(`SELECT tags FROM reviews`)
        const tags = new Set<string>()
        result.rows.forEach(review => review.tags.forEach(e=>{
            tags.add(e)
        }))
        return [ ...tags ]
    }

    static async getOneById(id: number): Promise<Review | undefined> {
        let result = await db.query<DBReview>(`SELECT * FROM reviews WHERE reviews.id = ${id}`)
        if (result.rows.length !== 1){
            return undefined
        }
        return this.serializeReview(result.rows[0])
    }

    static async getAllByUserId(user_id: number): Promise<Review[]> {
        let result= await db.query<DBReview>(`
                            SELECT r.*, COALESCE( c.cnt, 0 ) AS comments_count, COALESCE( l.cnt, 0 ) AS likes
                            FROM reviews r
                            LEFT JOIN (
                            SELECT review_id, count(*) as cnt 
                            FROM comments
                            GROUP BY review_id
                            ) c ON r.id = c.review_id
                            LEFT JOIN (
                            SELECT review_id, count(*) as cnt 
                            FROM likes
                            GROUP BY review_id
                            ) l ON r.id = l.review_id
                            WHERE r.author_id = ${user_id}
                            ORDER BY likes DESC`)
        if (!result.rows.length){
            return []
        }
        return this.serializeReviews(result.rows)
    }



    static async getAllByCategory(category: string): Promise<Review[]>{
        let query = ''
        switch (category) {
            case 'recent':
                query = `   SELECT r.*, COALESCE( c.cnt, 0 ) AS comments_count, COALESCE( l.cnt, 0 ) AS likes
                            FROM reviews r
                            LEFT JOIN (
                            SELECT review_id, count(*) as cnt 
                            FROM comments
                            GROUP BY review_id
                            ) c ON r.id = c.review_id
                            LEFT JOIN (
                            SELECT review_id, count(*) as cnt 
                            FROM likes
                            GROUP BY review_id
                            ) l ON r.id = l.review_id
                            ORDER BY r.date DESC`
                break
            case 'popular':
                query = `   SELECT r.*, COALESCE( c.cnt, 0 ) AS comments_count, COALESCE( l.cnt, 0 ) AS likes
                            FROM reviews r
                            LEFT JOIN (
                            SELECT review_id, count(*) as cnt 
                            FROM comments
                            GROUP BY review_id
                            ) c ON r.id = c.review_id
                            LEFT JOIN (
                            SELECT review_id, count(*) as cnt 
                            FROM likes
                            GROUP BY review_id
                            ) l ON r.id = l.review_id
                            ORDER BY likes DESC`
                break
            default:
                return []
        }
        const result = await db.query<DBReview>(query)
        return this.serializeReviews(result.rows)
    }
    static async updateReview(review: DBReview): Promise<void> {
        const query = `
            UPDATE reviews 
            SET product_id = ${review.product_id},
                title = '${review.title}',
                date = to_timestamp(${(new Date(review.date).getTime())} / 1000.0),
                tags = ARRAY['${review.tags.join("','")}'],
                score = ${review.score},
                text = '${review.text}',
                images = ARRAY['${review.images.join("','")}']
            WHERE id = ${review.id}`
        await db.query(query)
    }


    static async newReview(review: DBReview): Promise<void> {
        const query = `INSERT INTO reviews 
        (id, product_id, title, author_id, date, tags, score, text, images)
        VALUES (Default, ${review.product_id}, '${review.title}', ${review.author_id}, to_timestamp(${Date.now()} / 1000.0), ARRAY['${review.tags.join("','")}'], ${review.score}, '${review.text}', ARRAY['${review.images.join("','")}'])`
        await db.query(query)
    }

    static async removeReview(uid: string, id: number): Promise<void> {
        const review = await db.query(`SELECT author_id FROM reviews WHERE id = ${id}`)
        if (review.rows.length !== 1) {
            throw DatabaseError.DeleteError(`Cannot find review with ${id} id`)
        }
        const author = await db.query(`SELECT id, role_id FROM users WHERE uid = '${uid}'`)
        console.log(author.rows)
        if (author.rows.length !== 1) {
            throw DatabaseError.DeleteError(`Unable to remove review, unknown user`)
        }
        if (author.rows[0].id !== review.rows[0].author_id && author.rows[0].role_id !== 1) {
            throw DatabaseError.DeleteError(`Unable to remove review, permission error`)
        }
        await Promise.all([
            db.query(`DELETE FROM comments WHERE review_id = ${id}`),
            db.query(`DELETE FROM likes WHERE review_id = ${id}`)]
        )
        await db.query(`DELETE FROM reviews WHERE id = ${id}`)
    }

    static async serializeReview(dbReview: DBReview): Promise<Review> {
        const author = await UserService.getById(dbReview.author_id)
        const product = await ProductService.getById(dbReview.product_id)
        const review = {...dbReview, author_id: undefined, product_id: undefined, comments_count: undefined}
        return {
            ...review,
            product,
            author,
            commentsCount: dbReview.comments_count,
            date: new Date(dbReview.date)
        }
    }

    static async serializeReviews(dbReviews: DBReview[]): Promise<Review[]> {
        const authorIDs = new Set<number>()
        const productIDs = new Set<number>()
        dbReviews.forEach(review => {
            authorIDs.add(review.author_id)
            productIDs.add(review.product_id)
        })
        const authors = await UserService.getByIds([...authorIDs])
        const products = await ProductService.getByIds([...productIDs])
        return dbReviews.map(review => {
            const reviewTmp = { ...review, author_id: undefined, product_id: undefined, comments_count: undefined }
            return {
                ...reviewTmp,
                author: authors.find(author => author.id === review.author_id),
                product: products.find(product => product.id === review.product_id),
                commentsCount: review.comments_count,
                date: new Date(review.date)
            }
        })
    }
}