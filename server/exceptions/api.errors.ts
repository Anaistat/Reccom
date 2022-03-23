import {ValidationError} from 'express-validator'

export default class ApiErrors extends Error {
	public status: number
	public errors: string[]
	public validationErrors: ValidationError[]

	constructor(status: number, message: string, errors: string[], validationErrors: ValidationError[] ) {
		super(message)
		this.status = status
		this.errors = errors
		this.validationErrors = validationErrors
	}

	static UnauthorizedError(){
		return new ApiErrors(401, 'User is not authorized.', [], [])
	}

	static PermissionError(errors: string[] = []) {
		return new ApiErrors(405,'No permissions to do that.', errors,[])
	}

	static BadRequest(errors: string[] = [], validationErrors = []){
		return new ApiErrors(400, 'Bad request', errors, validationErrors = [])
	}

	static ValidationError(validationErrors = []) {
		return new ApiErrors(400, 'Validation error', [], validationErrors)
	}
}