import {Request, Response, NextFunction} from 'express'
import UserService from "../service/user.service";
import {Candidate, User} from "../../client/src/types";
import ApiErrors from "../exceptions/api.errors";
import {validationResult} from "express-validator";
import DatabaseError from "../exceptions/database.errors.";

class UserController {

    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users: User[] = await UserService.getAllUsers()
            if (users.length) {
                return res.status(200).json({ message: 'Success', data: users })
            }
            return res.status(500).json({error: 'Cannot find any user.'})
        }
        catch (error) {
            next(error)
        }
    }

    public async getAllLikes(request: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return next(ApiErrors.ValidationError(errors.array()))
            }
            const user_id = parseInt(request.params.user_id)
            const likes = await UserService.getAllLikes(user_id)
            return response.status(200).json({data: likes})

        } catch (error) {
           next(error)
        }
    }

    public async likeReview(request: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return next(ApiErrors.ValidationError(errors.array()))
            }
            const review_id = parseInt(request.params.review_id)
            const user_id = parseInt(request.body.user_id)
            await UserService.likeReview(user_id, review_id)
            return response.status(201).json({ message: 'Success' })
        } catch (error) {
            next(error)
        }
    }

    public async dislikeReview(request: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return next(ApiErrors.ValidationError(errors.array()))
            }
            const review_id = parseInt(request.params.review_id)
            const user_id = parseInt(request.query.user_id as string)
            await UserService.dislikeReview(user_id, review_id)
            return response.status(201).json({ message: 'Success' })
        } catch (error) {
            next(error)
        }
    }


    public async changeUsersStatus(request: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return next(ApiErrors.ValidationError(errors.array()))
            }
            const {uids, status} = request.body
            const isSuccess: boolean = await UserService.changeUserStatuses(uids, status)
            if (isSuccess) {
                return response.status(200).json({message: 'Success'})
            }
            return response.status(500).json({error: 'Unexpected error.'})
        }
        catch (error) {
            next(error)
        }
    }

    public async changeUsersRole(request: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return next(ApiErrors.ValidationError(errors.array()))
            }
            const {uids, role} = request.body
            if (!Array.isArray(uids) || typeof role !== "string") {
                next(ApiErrors.BadRequest([`Incorrect data uids or role`]))
            }
            const isSuccess: boolean = await UserService.changeUserRoles(uids, role)
            if (isSuccess) {
                return response.status(200).json({ message: 'Success' })
            }
            return response.status(500).json({ error: 'Unexpected error.' })
        }
        catch (error) {
            next(error)
        }
    }

    public async getOneByUid(request: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return next(ApiErrors.ValidationError(errors.array()))
            }
            const user: User | undefined = await UserService.getByUid(request.params.uid as string)
            if (!user) {
                return next(ApiErrors.BadRequest(['Unable to find user with uid = ' + request.params.uid]))
            }
            return response.status(200).json({data: user})
        }
        catch (error) {
            next(error)
        }
    }

    public async getOneById(request: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return next(ApiErrors.ValidationError(errors.array()))
            }
            const id = parseInt(request.params.id)
            const user: User | undefined = await UserService.getById(id)
            if (!user) {
                return next(ApiErrors.BadRequest(['Unable to find user with id = ' + id]))
            }
            return response.status(200).json({ data: user })
        }
        catch (error) {
            next(error)
        }
    }



    public async authorize(request: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return next(ApiErrors.ValidationError(errors.array()))
            }
            const candidate: Candidate = request.body

            const probablyUser = await UserService.getByUid(candidate.uid)
            if (probablyUser && probablyUser.status !== 'Block') {
                await UserService.updateLoginDate(probablyUser.id)
                return response.status(200).json({ data: probablyUser })
            }
            if (probablyUser?.status === 'Block') {
                return next(ApiErrors.PermissionError(['User is blocked.']))
            }
            const user = await UserService.register(candidate)
            if (!user) {
                return next(DatabaseError.InsertError('Unable to create user: ' + JSON.stringify(candidate)))
            }
            return response.status(200).json({ data: user })
        }
        catch (error) {
            next(error)
        }
    }
}

export default new UserController()