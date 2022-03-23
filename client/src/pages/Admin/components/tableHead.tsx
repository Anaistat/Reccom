import React, {useContext, useState, useEffect, FC, useLayoutEffect} from 'react';
import "./table.scss"
import {Button} from "react-bootstrap";
import UsersContext from "../../../context/users.context";
import AppContext from "../../../context/app.context";
import appLanguage from "../../../language";
import useTheme from "../../../hooks/useTheme";

const TableHead:FC = () => {

    const [selectAll, setSelectAll] = useState<boolean>(false)
    const {setUsers} = useContext(UsersContext)
    const {language} = useContext(AppContext)
    const {theme} = useTheme()

    useEffect(()=>{
        setUsers(prevState=>
            prevState.map(e=>{
                e.isChecked = selectAll
                return e
            })
        )
    }, [selectAll])


    return (
        <div className="table-title">
            <div className="cell">
                <Button variant="outline-secondary" onClick={()=>setSelectAll(prev=>!prev)}>{selectAll?`${appLanguage[language].unSelectAll}`:`${appLanguage[language].selectAll}`}</Button>
            </div>
            <div className="cell">{appLanguage[language].user}</div>
            <div className="cell">{appLanguage[language].role}</div>
            <div className="cell">{appLanguage[language].status}</div>
            <div className="cell">{appLanguage[language].totalReviews}</div>
            <div className="cell">{appLanguage[language].registrationDate}</div>
            <div className="cell">{appLanguage[language].lastLoginDate}</div>
        </div>
    );
};

export default TableHead;