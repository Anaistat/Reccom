import React, {FC, useContext, useEffect, useState} from 'react';
import "./table.scss"
import TableHead from "./tableHead"
import TableBody from "./tableBody"
import AppContext from "../../../context/app.context";
import Toolbar from "./toolbar";
import UsersContext from "../../../context/users.context";
import UserService from "../../../services/UserService";

const Table:FC = () => {

    const {user} = useContext(AppContext)
    const {users, setUsers} = useContext(UsersContext)

    useEffect(()=>{
        if(user && user.role === 'Admin'){
            UserService.getAllUsers(user.uid).then(res=>{
               const result = res.map(e=>{
                   return {...e, isChecked: false}
               })
                if(result) setUsers(result)
            }).catch(err=>{
                console.warn(err)
            })
        }
        console.log(users)
    }, [user])


    if(users){
        return (
                <div className="control-table-container">
                    <Toolbar/>
                    <TableHead/>
                    {
                        users.map(e=><TableBody key={e.id} userForAdmin={e}/>)
                    }
                </div>
        );
    }
    else{
        return (
            <p>Error loading users</p>
        )
    }
};

export default Table;