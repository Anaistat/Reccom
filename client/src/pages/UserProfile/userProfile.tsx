import React, {useContext, useEffect, useState} from 'react';
import "./userProfile.scss"
import InfoPanel from "./components/infoPanel";
import ReviewsPanel from "./components/reviewsPanel";
import {Review} from "../../types";
import ReviewService from "../../services/ReviewService";
import {useParams} from "react-router-dom";
import AppContext from "../../context/app.context";
import appLanguage from "../../language"

const UserProfile = () => {

    const [reviews, setReviews] = useState<Review[]>([])
    const {id} = useParams()
    const {language} = useContext(AppContext)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        if(loading){
            ReviewService.getAllUserReviews(Number(id)).then(res=> {
                setReviews(res)
                setLoading(false)
            }).catch(console.warn)
        }
    }, [loading])

    const load = () =>{
        setLoading(true)
    }

    return (
        <article className="profile-container">
            <h1><svg width="35" height="35" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.5 27.5C35.0969 27.5 41.25 21.3469 41.25 13.75C41.25 6.15312 35.0969 0 27.5 0C19.9031 0 13.75 6.15312 13.75 13.75C13.75 21.3469 19.9031 27.5 27.5 27.5ZM27.5 34.375C18.3219 34.375 0 38.9813 0 48.125V55H55V48.125C55 38.9813 36.6781 34.375 27.5 34.375Z" fill="#121212" fillOpacity="0.8"/>
            </svg>{appLanguage[language].profile}</h1>

            <div className="user-info">
                <InfoPanel reviewCount={reviews.length}/>
                <ReviewsPanel reviews={reviews} callback={load}/>
            </div>
        </article>
    );
};

export default UserProfile;