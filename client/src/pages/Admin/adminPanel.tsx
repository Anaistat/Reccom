import React, {FC, useContext, useState} from 'react';
import "./adminPanel.scss"
import Table from "./components/table";
import UsersContext from "../../context/users.context";
import {UserForAdmin} from "../../types";
import AppContext from "../../context/app.context";
import appLanguage from "../../language";

const AdminPanel:FC = () => {

    const [users, setUsers] = useState<UserForAdmin[]>([])
    const {language} = useContext(AppContext)

    return (
        <UsersContext.Provider value={ {users, setUsers} }>
            <h1 className="admin-header">{appLanguage[language].adminPanel}</h1>
            <Table/>
        </UsersContext.Provider>
    );
};

export default AdminPanel;