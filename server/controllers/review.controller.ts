import ReviewService from "../service/review.service"
import ProductService from "../service/product.service"
import {Review} from "../../client/src/types"
import {Request, Response, NextFunction} from "express"
import ApiErrors from "../exceptions/api.errors"
import {validationResult} from 'express-validator'
import UserService from "../service/user.service";

class ReviewController{

    public async getAllTags(request:Request, response: Response, next: NextFunction) {
        try {
            const tags = await ReviewService.getAllTags()
            response.status(200).json({data: tags})
        } catch (error) {
            next(error)
        }
    }


    public async getOneReview(request: Request, response: Response, next: NextFunction) {
        try{
            const errors = validationResult(request)
            if (!errors.isEmpty()){
                return next(ApiErrors.ValidationError(errors.array()))
            }
            const id: number = parseInt(request.params.id)
            const review: Review | undefined = await ReviewService.getOneById(id)
            if (!review) {
                response.status(200).json({error: 'Cannot find any review with ID = ' + id})
            }
            return response.status(200).json({ message: 'Success', data: review })
        } catch(error) {
            next(error)
        }
    }
    public async updateById(request:Request, response: Response, next: NextFunction) {
        try {
            const data = JSON.parse(request.body.body)
            let images = []
            if (request.files && Array.isArray(request.files)){
                images = request.files.map(file=>file.path)
            }
            await ReviewService.updateReview({ ...data, images: images })
            response.status(200).json({ message: 'Success' })
        } catch (error) {
            next(error)
        }


    }
    public async removeById(request:Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return next(ApiErrors.ValidationError(errors.array()))
            }
            const review_id: number = parseInt(request.params.review_id as string)
            const uid: string = request.body.uid
            await ReviewService.removeReview(uid, review_id)
            response.status(200).json({message: 'Success'})
        } catch(error) {
            next(error)
        }
    }

    public async getAllReviews(request:Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return next(ApiErrors.ValidationError(errors.array()))
            }
            const category: string = request.params.category as string
            const reviews = await ReviewService.getAllByCategory(category)
            return response.status(200).json({ data: reviews })
        } catch(error){
            next(error)
        }
    }

    public async getAllReviewsByUserId(request: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return next(ApiErrors.ValidationError(errors.array()))
            }
            const user_id = parseInt(request.query.user_id as string)
            const reviews = await ReviewService.getAllByUserId(user_id)
            return response.status(200).json({data: reviews})

        } catch (error) {
            next(error)
        }
    }

    public async addNewReview(request: Request, response: Response, next) {
       try{
           const data = JSON.parse(request.body.body)
           let images = []
           if (request.files && Array.isArray(request.files)){
               images = request.files.map(file=> file.path)

           }
           await ReviewService.newReview({ ...data, images: images })
           response.status(200).json({ message: 'Success' })
       }catch(err){
           next(err)
       }
    }

    public async getAllProducts(request: Request, response: Response, next) {
        try{
            const products = await ProductService.getAllProducts()
            return response.status(200).json({data: products})
        }
        catch (err){
            next(err)
        }
    }
}
export default new ReviewController()