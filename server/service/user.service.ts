import db from "../../db";
import {Candidate, User, DBUser, DBUserStatus, DBRole} from "../../client/src/types";
import ApiErrors from "../exceptions/api.errors";
import DatabaseError from "../exceptions/database.errors.";

export default class UserService{

    static async getAllUsers(): Promise<User[]> {
        const result = (await db.query<DBUser>('SELECT * FROM users')).rows
        return this.serializeUsers(result)
    }

    static async getAllLikes(user_id: number): Promise<number[]> {
        const response = await db.query(`SELECT review_id from likes WHERE user_id = ${user_id}`)
        return response.rows.map(obj => obj.review_id)
    }

    static async changeUserStatuses(usersUID: string[], status: string): Promise<boolean> {
        const statuses = await this.getAllUserStatuses()
        const statusObj = statuses.find(s => s.type === status)
        if (!statusObj) {
            throw ApiErrors.BadRequest([`Unknown status: "${status}"`])
        }
        const queryCondition = usersUID.map((uid, i) =>  {
            if (!i) {
                return `WHERE uid = '${uid}'`
            }
            return `OR uid = '${uid}'`
        }).join(' ')
        const query = `UPDATE users SET status_id = ${statusObj.id} ${queryCondition}`
        await db.query(query)
        return true
    }

    static async changeUserRoles(usersUID: string[], role: string): Promise<boolean> {
        const roles = await this.getAllUserRoles()
        const roleObj = roles.find(s => s.type === role)
        if (!roleObj) {
            throw ApiErrors.BadRequest([`Unknown status: "${role}"`])
        }
        const queryCondition = usersUID.map((uid, i) =>  {
            if (!i) {
                return `WHERE uid = '${uid}'`
            }
            return `OR uid = '${uid}'`
        }).join(' ')
        const query = `UPDATE users SET role_id = ${roleObj.id} ${queryCondition}`
        await db.query(query)
        return true
    }

    static async getByIds(ids: number[]): Promise<User[]>{
        const str = ids.map((id, index) => {
           return index ? `OR id = ${id}` : `WHERE id = ${id}`
        }).join(' ')
        const result = await db.query<DBUser>(`SELECT * from users ${str}`)
        return this.serializeUsers(result.rows)
    }

    static async getAllUserStatuses(): Promise<DBUserStatus[]> {
        return (await db.query<DBUserStatus>(`SELECT * FROM statuses`)).rows
    }

    static async getAllUserRoles(): Promise<DBRole[]>{
        return (await db.query<DBRole>(`Select * FROM roles`)).rows
    }

    static async getByUid(uid: string): Promise<User | undefined> {
        let users: DBUser[] = (await db.query<DBUser>(`SELECT * FROM users WHERE uid = '${uid}'`)).rows
        if (users.length !== 1) {
            return undefined
        }
        return this.serializeUser(users[0])
    }

    static async getById(id: number): Promise<User | undefined> {
        let users: DBUser[] = (await db.query<DBUser>(`SELECT * FROM users WHERE id = '${id}'`)).rows
        if (users.length !== 1) {
            return
        }
        return this.serializeUser(users[0])
    }

    static async register(candidate: Candidate): Promise<User | undefined> {
        const query = `INSERT INTO users (id, uid, name, photo, role_id, status_id, registration_date, last_login_date) 
        VALUES (Default, '${ candidate.uid }', '${candidate.name}', '${candidate.photo}', 2, 2, to_timestamp(${Date.now()} / 1000.0), to_timestamp(${Date.now()} / 1000.0)) RETURNING *`
        const result = await db.query<DBUser>(query)
        if (result.rows.length !== 1) {
            return undefined
        }
        return this.serializeUser(result.rows[0])
    }


    static async updateLoginDate(user_id: number): Promise<void> {
        await db.query(`UPDATE users SET last_login_date = to_timestamp(${Date.now()} / 1000.0) WHERE id = ${user_id}`)
    }

    static async likeReview(user_id: number, review_id: number) {
        const checkResponse = await db.query(`SELECT * from likes WHERE user_id = ${user_id} AND review_id = ${review_id}`)
        if (checkResponse.rowCount) {
            throw DatabaseError.InsertError(`User ${user_id} is already liked review ${review_id}.`)
        }
        const response = await db.query(`INSERT INTO likes (user_id, review_id) VALUES (${user_id}, ${review_id})`)
        if (!response.rowCount) {
            throw DatabaseError.InsertError(`Cannot set like from user ${user_id} to review ${review_id}.`)
        }
    }

    static async dislikeReview(user_id: number, review_id: number) {
        const checkResponse = await db.query(`SELECT * from likes WHERE user_id = ${user_id} AND review_id = ${review_id}`)
        if (checkResponse.rowCount !== 1) {
            throw DatabaseError.DeleteError(`User ${user_id} is not liked review ${review_id} yet.`)
        }
        const response = await db.query(`DELETE FROM likes WHERE user_id = ${user_id} AND review_id = ${review_id}`)
        if (!response.rowCount) {
            throw DatabaseError.DeleteError(`Cannot set like from ${user_id} user id to ${review_id} review id (Unexpected error).`)
        }
    }

    static async serializeUser(user: DBUser): Promise<User> {
        const roles = await this.getAllUserRoles()
        const statuses = await this.getAllUserStatuses()
        return {
            id: user.id,
            uid: user.uid,
            name: user.name,
            photo: user.photo,
            status: statuses.find(e => e.id === user.status_id)?.type || 'User',
            role: roles.find(e => e.id === user.role_id)?.type || 'Block',
            lastLoginDate: new Date(user.last_login_date),
            registrationDate: new Date(user.registration_date)
        }
    }

    static async serializeUsers(users: DBUser[]): Promise<User[]> {
        const roles = await this.getAllUserRoles()
        const statuses = await this.getAllUserStatuses()
        return users.map( user => ({
            id: user.id,
            uid: user.uid,
            name: user.name,
            photo: user.photo,
            status: statuses.find(e => e.id === user.status_id)?.type || 'User',
            role: roles.find(e => e.id === user.role_id)?.type || 'Block',
            lastLoginDate: new Date(user.last_login_date),
            registrationDate: new Date(user.registration_date)
        }))
    }
}