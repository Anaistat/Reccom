import axios from "axios";
import {Comment, Product, Review} from "../types";

type ReviewProp = {
    title: string
    product_id: number
    author_id: number
    tags: string[]
    images: FileList
    score: number
    text: string,
}


export default class ReviewService{

    static async getReview(id:number): Promise<Review | undefined>{
        try {
            const response = await axios.get(`/api/review/${id}`)
            if (response.data.error) {
                console.warn(response.data.error)
                return undefined
            }
            return response.data.data
        } catch(error){
            console.error(error)
            return undefined
        }

    }

    static async getPopularReviews(): Promise<Review[]>{
        try {
            const response = await axios.get(`/api/reviews/popular`)
            if (response.data.error) {
                console.warn(response.data.error)
            }
            return response.data.data
        } catch (error) {
            console.error(error)
            return []
        }
    }

    static async getRecentReviews(): Promise<Review[]>{
        try {
            const response = await axios.get(`/api/reviews/recent`)
            if (response.data.error) {
                console.warn(response.data.error)
                return []
            }
            return response.data.data
        } catch (error) {
            console.error(error)
            return []
        }
    }

    static async updateReview(review: {id: number, date: string} & Omit<ReviewProp, 'author_id'>): Promise<void> {
        try {
            const formData = new FormData()
            Array.from(review.images).forEach(img => {
                formData.append("images", img)
            })

            formData.append("body", JSON.stringify({...review, images: undefined}))

            const response = await axios.patch('/api/reviews/edit', formData, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            })
            if (response.data.error) {
                console.warn(response.data.error)
            }
        }
        catch (error) {
            return console.error(error)
        }
    }


    static async addNewReview(review: ReviewProp){
        try{
            const formData = new FormData()
            Array.from(review.images).forEach(img => {
                formData.append("images", img)
            })

            formData.append("body", JSON.stringify({...review, images: undefined}))

            const response = await axios.post('/api/addNewReview', formData, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            })
            if (response.data.error) {
                console.warn(response.data.error)
                return false
            }
            return true
        }
        catch(error){
            console.error(error)
            return false
        }
    }

    static async getAllUserReviews(id:number): Promise<Review[]>{
        try{
            const response = await axios.get(`/api/reviews?user_id=${id}`)
            if (response.data.error) {
                console.warn(response.data.error)
                return []
            }
            return response.data.data

        }catch(error){
            console.error(error)
            return []
        }
    }

    static async getAllProducts(): Promise<Product[]>{
        try {
            const response = await axios.get("../api/products")
            console.log(response)
            if (response.data.error) {
                console.warn(response.data.error)
                return []
            }
            return response.data.data
        }
        catch (error) {
            console.error(error)
            return []
        }
    }

    static async getComments(reviewId: number, uid:string): Promise<Comment[]> {
        try {
            const response = await axios.post(`/api/comments/${reviewId}`, {uid: uid})
            if (response.data.error) {
                console.warn(response.data.error)
                return []
            }
            return response.data.data
        } catch (error) {
            console.error(error)
            return []
        }
    }

    static async addNewComment(uid:string, author_id: number, text: string, review_id: number):Promise<boolean>{
        try {
            const response = await axios.post('/api/newComment', {uid, author_id, text, review_id})
            if (response.data.error) {
                console.warn(response.data.error)
                return false
            }
            return true
        } catch(error) {
            console.error(error)
            return false
        }
    }

    static async getUserLikes(id:number):Promise<number[]>{
        try{

            const response = await axios.get(`/api/user/likes/${id}`)
            if (response.data.error) {
                console.warn(response.data.error)
                return []
            }
            return response.data.data

        } catch(error){
            console.error(error)
            return []
        }
    }

    static async likeReview(uid:string, review_id:number, user_id:number):Promise<boolean>{
        try{
            const response = await axios.post(`/api/user/like/${review_id}`, {uid, user_id})
            if(response.data.error){
                console.warn(response.data.error)
                return false
            }
            return true

        }catch(error){
            console.error(error)
            return false
        }
    }

    static async dislikeReview(review_id:number, id:number):Promise<boolean>{
        try{
            const response = await axios.delete(`/api/user/like/${review_id}`, {params: {user_id: id}})
            if(response.data.error){
                console.warn(response.data.error)
                return false
            }
            return true

        }catch(error){
            console.error(error)
            return false
        }
    }

    static async deleteReview(uid:string, review_id:number):Promise<boolean>{
        try{
            const response = await axios.delete(`/api/reviews/remove/${review_id}`, {data: {uid}})
            if(response.data.error){
                console.warn(response.data.error)
                return false
            }
            return true
        }catch(error){
            console.error(error)
            return false
        }
    }

    static async getTags():Promise<string[]>{
        try{
            const response = await axios.get('/api/tags')
            if(response.data.error){
                console.warn(response.data.error)
                return []
            }
            return response.data.data
        }catch(error){
            console.error(error)
            return []
        }
    }

}