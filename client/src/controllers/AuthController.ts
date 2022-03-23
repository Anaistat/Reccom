import UserService from "../services/UserService"
import {Candidate, User} from "../types"

class AuthController {
    public async authorize(candidate: Candidate): Promise<User> {
        let probablyUser = await UserService.getUserByUid(candidate.uid)
        if (!probablyUser) {
            probablyUser = await UserService.register(candidate)
        }
        if (!probablyUser) {
            throw new Error('Unable to authorize user ' + candidate.name)
        }
        return probablyUser
    }
}

export default new AuthController()