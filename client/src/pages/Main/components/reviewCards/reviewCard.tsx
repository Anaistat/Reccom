import React, {FC, StyleHTMLAttributes, useContext, useEffect, useState} from 'react';
import "./reviewCard.scss"
import {Review} from "../../../../types";
import {Flag} from "../../../../utility";
import Stars from "../../../../components/stars/stars";
import {Link, Navigate, useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ReviewService from "../../../../services/ReviewService";
import AppContext from "../../../../context/app.context";


type ReviewCardProps = {
    review: Review,
    isLiked: boolean,
}

const ReviewCard:FC<ReviewCardProps> = ({review, isLiked}) => {

    const route:string = `/review/${review.id}`

    return (
        <Link to={route} className="card">
            <div className="review-card-container">
                <div className="card-upper-part"
                style={{backgroundImage: `linear-gradient(to right, rgba(0,0,0,.5), rgba(0,0,0,.5)), url("http://localhost:8080/images/${review.images[0]} ")`}}>
                    <div className="card-type">
                        <div className="card-type-flag" style={{
                            background: Flag[review.product.category].background
                        }}>
                            <div className="card-product-category">
                                <svg className="product-icon" width="28" height="28" viewBox="0 0 30 30"><path d={Flag[review.product.category].icon} fill='white'/></svg>
                                <span className="category-name">{review.product.category}</span>
                            </div>

                        </div>
                    </div>
                    <div className="card-name">
                        <div>
                            <h3 className="card-name-title">{review.product.title}</h3>
                            <Stars score={review.score} width={26} height={26}/>
                        </div>
                        <div>
                            <span className="review-author">{review.author.name}</span>
                        </div>
                    </div>
                </div>
                <div className="card-bottom-part">
                    <h2>{review.title}</h2>
                    <ReactMarkdown className="card-text">{review.text}</ReactMarkdown>
                    <div>
                        <div>
                        {
                            review.tags.slice(0,2).map(e=><span className="card-tags" key={e}>#{e}</span>)
                        }
                        </div>
                        <span>{new Date(review.date).toDateString()}</span>
                        <div className="card-comment-like">
                            <p>{review.commentsCount}</p>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="comment-icon">
                                <path d="M19.99 2C19.99 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H16L20 20L19.99 2ZM16 12H4V10H16V12ZM16 9H4V7H16V9ZM16 6H4V4H16V6Z"/>
                            </svg>
                            <p>{review.likes}</p>
                            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.88659 16.6603L8.88587 16.6596C6.30081 14.3155 4.19567 12.4057 2.73078 10.6147C1.27162 8.83074 0.5 7.22576 0.5 5.5C0.5 2.69614 2.69614 0.5 5.5 0.5C7.08861 0.5 8.62112 1.24197 9.61932 2.41417L10 2.8612L10.3807 2.41417C11.3789 1.24197 12.9114 0.5 14.5 0.5C17.3039 0.5 19.5 2.69614 19.5 5.5C19.5 7.22577 18.7284 8.83077 17.2691 10.6161C15.8065 12.4055 13.7058 14.3144 11.1265 16.6584L11.1148 16.669L11.1137 16.67L10.0013 17.675L8.88659 16.6603Z" stroke={isLiked?"#800808":"#000000"} fill={isLiked?"#800808":"#ffffff"}/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    );
};

export default ReviewCard;