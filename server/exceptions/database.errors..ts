export default class DatabaseError extends Error {
	public status: number

	constructor(status: number, message: string, ) {
		super(message)
		this.status = status
	}

	static InsertError(message: string) {
		return new DatabaseError(409, message)
	}

	static GetError(message: string) {
		return new DatabaseError(404, message)
	}

	static ModifyError(message: string) {
		return new DatabaseError(404, message)
	}

	static DeleteError(message: string) {
		return new DatabaseError(404, message)
	}
}