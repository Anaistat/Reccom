import React, {FC, useContext, useEffect, useState} from 'react';
import "./reviewDescription.scss"
import ReviewSlider from "./components/reviewSlider";
import ReviewTypeFlag from "./components/reviewTypeFlag";
import {Review} from "../../types";
import ReviewService from "../../services/ReviewService";
import {useParams} from "react-router-dom";
import Preloader from "../../components/preloader/preloader";
import Comments from "./components/comment/comments";
import ReactMarkdown from "react-markdown";
import AppContext from "../../context/app.context";
import Stars from "../../components/stars/stars";

const ReviewDescription: FC = () => {

    const [review, setReview] = useState<Review | undefined>()
    const [load, setLoad] = useState<boolean>(true)
    const {id} = useParams()
    const {user} = useContext(AppContext)

    useEffect(()=>{
        if(id && load){
            ReviewService.getReview(Number(id)).then(res=>{
                if(res) setReview(res)
                setLoad(false)
            }).catch(err=>{
                console.log(err)
                setLoad(false)
            })
        }
    }, [])


    if(load){
        return(
            <Preloader/>
        )
    }

    if(review) {
        return (
            <div className="review-description-container">
                <ReviewSlider name={review.product.title} score={review.score} images={review.images}/>
                <h2 className="review-name">{review.title}</h2>
                <ReviewTypeFlag category={review.product.category}/>
                <div className="product-info">
                    <div>
                        <span className="author-name">{review.author.name}</span>
                        <div>
                            {
                                review.tags.map(e => <span className="description-tags" key={e}>#{e}</span>)
                            }
                        </div>
                    </div>
                    <div className="product-and-score">
                        <h3 className="product-name">{review.product.title}</h3>
                        <Stars score={review.score} width={25} height={25}/>
                        <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="review-description">
                    <ReactMarkdown>{review.text}</ReactMarkdown>
                </div>

                {
                    user &&
                    <Comments/>
                }
            </div>
        );
    }
    else{
        return <p>Error loading data</p>
    }
};

export default ReviewDescription;