import { Router } from 'express'
import ReviewController from '../controllers/review.controller'
import UserController from '../controllers/user.controller'
import CommentsController from '../controllers/comments.controller'
import authorizationMiddleware from '../middlewares/authorization.middleware'
import permissionCheckMiddleware from '../middlewares/permissionCheck.middleware'
import { body, param, query } from 'express-validator'

const router = Router()

router.get( '/review/:id',
	param('id').isInt({min: 0}),
	ReviewController.getOneReview)
router.get( '/reviews',
	query('user_id').isInt({min: 0}),
	ReviewController.getAllReviewsByUserId)
router.get( '/reviews/:category',
	param('category').isString(),
	ReviewController.getAllReviews)

router.delete('/reviews/remove/:review_id',
	authorizationMiddleware,
	param('review_id').isInt({min: 0}),
	ReviewController.removeById)

router.patch('/reviews/edit', ReviewController.updateById)

router.get('/tags', ReviewController.getAllTags)


router.get( '/products',
	ReviewController.getAllProducts)
router.post('/addNewReview',
	body('image').exists().isArray(),
	body('body').exists(),
	ReviewController.addNewReview)

router.post('/authorize',
    body('uid').isString(),
    body('name').isString(),
    body('photo').isString(),
    UserController.authorize)
router.patch('/changeUsersStatus',
	permissionCheckMiddleware,
    body('uids').isArray(),
    body('status').isString(),
    UserController.changeUsersStatus)
router.patch('/changeUsersRole',
	permissionCheckMiddleware,
    body('uids').isArray(),
    body('role').isString(),
    UserController.changeUsersRole)

router.get ('/user/:id',
	param('id').isInt({min: 0}),
	UserController.getOneById)

router.get ('/user/uid/:uid',
	param('uid').isString(),
	UserController.getOneByUid)

router.post('/users',
	permissionCheckMiddleware,
	body('uid').exists(),
	UserController.getAllUsers)

router.get ('/user/likes/:user_id',
	param('user_id').isInt({min: 0}),
	UserController.getAllLikes)

router.post ('/user/like/:review_id',
	authorizationMiddleware,
	param('review_id').isInt({min: 0}),
	body('user_id').isInt({min: 0}),
	UserController.likeReview)

router.delete('/user/like/:review_id',
	param('review_id').isInt({min: 0}),
	query('user_id').isInt({min: 0}),
	UserController.dislikeReview)

router.post('/comments/:review_id',
	authorizationMiddleware,
	CommentsController.getAllByReviewId)
router.post('/newComment',
	authorizationMiddleware,
	CommentsController.addNewComment)

export default router