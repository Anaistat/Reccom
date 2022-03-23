import {createContext, Dispatch, SetStateAction} from "react"
import {User} from "../types";

type AppCtx = {
    language: string
    search: string
    user: User | undefined

    setLanguage: Dispatch<SetStateAction<string>>
    setSearch: Dispatch<SetStateAction<string>>
    setUser: Dispatch<SetStateAction<User | undefined>>
}

const AppContext = createContext<AppCtx>({
    language: '',
    search: '',
    user: undefined,

    setLanguage: () => {},
    setSearch: () => {},
    setUser: () => {}
})

export default AppContext