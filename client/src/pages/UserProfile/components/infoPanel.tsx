import React, {FC, useContext, useEffect, useState} from 'react';
import "./infoPanel.scss"
import {Button} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {User} from "../../../types";
import UserService from "../../../services/UserService";
import appLanguage from "../../../language";
import AppContext from "../../../context/app.context";

type InfoPanelProps = {
    reviewCount: number
}

const InfoPanel:FC<InfoPanelProps> = ({reviewCount}) => {

    const {id} = useParams()
    const [user, setUser] = useState<User | undefined>()
    const {language} = useContext(AppContext)


    useEffect(()=>{
        UserService.getUserById(Number(id)).then(res=>setUser(res)).catch(console.warn)
    }, [])

    if(user){
        return (
            <div className="info-panel-container">
                <img src={`${user.photo}`} className="user-photo" width="80" height="80" alt="user"/>
                <span className="user-name">{user.name}</span>
                <span>({user.role})</span>
                <div>
                    <h5>{appLanguage[language].totalReviews}: </h5>
                    <span>{reviewCount}</span>
                </div>
                <div>
                    <h5>{appLanguage[language].registrationDate}: </h5>
                    <span>{new Date(user.registrationDate).toLocaleDateString()}</span>
                </div>
                <Button variant="danger">Delete profile</Button>
            </div>
        );
    }
    else return <p>Error loading user</p>
};

export default InfoPanel;