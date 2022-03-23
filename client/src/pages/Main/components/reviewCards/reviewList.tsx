import React, {useContext, useEffect, useState} from 'react';
import ReviewService from "../../../../services/ReviewService";
import {Review} from "../../../../types";
import ReviewCard from "./reviewCard";
import {useParams, Navigate} from "react-router-dom";
import AppContext from "../../../../context/app.context";
import "./reviewList.scss"


const ReviewList = () => {

    const [reviews, setReviews] = useState<Review[]>([])
    const [likes, setLikes] = useState<number[]>([])
    const {category} = useParams()

    const {user, search} = useContext(AppContext)

    const filteredReviews:Review[] = reviews.filter(rev=>{
        return (rev.title.toLowerCase().includes(search.toLowerCase()) || rev.product.title.toLowerCase().includes(search.toLowerCase()) || rev.tags.forEach(e=>e.includes(search.toLowerCase())))
    })

    useEffect(()=>{

        switch (category){
            case "recent": ReviewService.getRecentReviews().then(res=>{setReviews(res)}).catch(err=>console.log(err))
                break
            case "popular": ReviewService.getPopularReviews().then(res=>{setReviews(res)}).catch(err=>console.log(err))
                break
            default: ReviewService.getPopularReviews().then(res=>{setReviews(res)}).catch(err=>console.log(err))
                break
        }

    }, [category])

    useEffect(()=>{
        if(user){
            ReviewService.getUserLikes(user.id).then(setLikes).catch(err=>console.warn(err))
        }
    }, [user])

    return (
        <article className="review-list-container">
            {
                filteredReviews.map(e=><ReviewCard review={e} isLiked={likes.includes(e.id)} key={"card-" + e.id}/>)
            }
        </article>
    );
};

export default ReviewList;