import React, {createContext, Dispatch, SetStateAction} from "react";
import {UserForAdmin} from "../types";

type UsersCtx = {
    users: UserForAdmin[],
    setUsers: Dispatch<SetStateAction<UserForAdmin[]>>
}

const UsersContext = createContext<UsersCtx>({
    users: [],
    setUsers: () => {}
})

export default UsersContext