import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import "./toolbar.scss"
import UsersContext from "../../../context/users.context";
import UserService from "../../../services/UserService";
import AppContext from "../../../context/app.context";
import appLanguage from "../../../language";

const Toolbar = () => {

    const {users, setUsers} = useContext(UsersContext)
    const {user, language} = useContext(AppContext)

    const requestUsers = () =>{
        if(user){
            UserService.getAllUsers(user.uid).then(res=>{
                const result = res.map(e=>{
                    return {...e, isChecked: false}
                })
                if(result) setUsers(result)
            }).catch(err=>{
                console.warn(err)
            })
        }
    }

    const changeStatus = async (status: "Block" | "Active") =>{
       if(user){
           const uids = users.filter(e => e.isChecked).map(e=> e.uid)
           await UserService.changeUserStatus(user.uid, uids, status)
           requestUsers()
       }
    }

    return (
        <div className="toolbar-container">
            <Button variant='warning' onClick={()=>changeStatus('Block')}>{appLanguage[language].block}</Button>
            <Button variant="success" className="unblock-button" onClick={()=>changeStatus('Active')}>{appLanguage[language].unblock}</Button>
            <Button variant="outline-danger" >{appLanguage[language].delete}</Button>
        </div>
    );
};

export default Toolbar;