import { Candidate, User } from "../types";
import axios from 'axios'

export default class UserService{

    static async getUserByUid(uid: string): Promise<User | undefined> {
        try {
            const response = await axios.get(`/api/user/uid/${uid}`)
            if (response.data.error) {
                console.warn(response.data.error)
                return undefined
            }
            return response.data.data
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    static async getUserById(id:number):Promise<User | undefined>{
        try{
            const response = await axios.get(`/api/user/${id}`)
            if (response.data.error) {
                console.warn(response.data.error)
                return undefined
            }
            return response.data.data

        }catch(error){
            console.error(error)
            return undefined
        }
    }

    static async register(candidate: Candidate): Promise<User | undefined> {
        try {
            const response = await axios.post('/api/authorize', candidate)
            if (response.data.error) {
                console.warn(response.data.error)
                return undefined
            }
            return response.data.data
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    static async getAllUsers(uid:string): Promise<User[]>{
        try{
            const response = await axios.post('/api/users', {uid: uid})
            if (response.status === 200)  {
                return response.data.data
            }
            console.error(response.data.error)
            return []
        } catch(error){
            console.log(error)
            return []
        }
    }

    static async changeUserStatus(uid:string, uids: string[], status: string): Promise<boolean>{
        try{
            await axios.patch('/api/changeUsersStatus', {uid, uids, status})
            return true
        } catch(error){
            console.error(error)
            return false
        }
    }
     
}