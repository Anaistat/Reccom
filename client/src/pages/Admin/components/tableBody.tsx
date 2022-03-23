import React, {ChangeEvent, FC, useContext, useEffect, useState} from 'react';
import "./table.scss"
import {UserForAdmin} from "../../../types";
import UsersContext from "../../../context/users.context";
import AppContext from "../../../context/app.context";
import {Link} from "react-router-dom";

type TableBodyProps = {
    userForAdmin: UserForAdmin
}

const TableBody:FC<TableBodyProps> = ({userForAdmin}) => {

    const {users,setUsers} = useContext(UsersContext)
    const {user} = useContext(AppContext)


    const checkUserHandler = (event:ChangeEvent<HTMLInputElement>) =>{
        setUsers(prevState => {
            return prevState.map(e => {
                if (e.id === userForAdmin.id) e.isChecked = event.target.checked
                return e
            })
        })
    }

    return (
        <div className="table-body">
            <div className="cell">
                <input type="checkbox" value={userForAdmin.id} checked={userForAdmin.isChecked} onChange={checkUserHandler}/>
            </div>
            <div className="cell">
                <Link to={`../user/${userForAdmin?.id}`}>{userForAdmin.name}</Link>
            </div>
            <div className="cell">{userForAdmin.role}</div>
            <div className="cell">{userForAdmin.status}</div>
            <div className="cell">111</div>
            <div className="cell">{ new Date(userForAdmin.registrationDate).toDateString()}</div>
            <div className="cell">{new Date(userForAdmin.lastLoginDate).toDateString()}</div>
        </div>
    );
};

export default TableBody;