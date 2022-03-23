import React, {FC, useContext, useEffect} from 'react';
import "./reviewsPanel.scss"
import {Button} from "react-bootstrap";
import Stars from "../../../components/stars/stars";
import {Review} from "../../../types";
import ReviewService from "../../../services/ReviewService";
import AppContext from "../../../context/app.context";
import {Link} from "react-router-dom";

type SingleReviewProps = {
    review: Review | undefined,
    callback: () => void
}

const SingleReview:FC<SingleReviewProps> = ({review, callback}) => {

    const {user} = useContext(AppContext)

    const deleteReview = async () =>{
        if(user && review){
            await ReviewService.deleteReview(user.uid, review.id)
            callback()
        }
    }

    const route = `../edit/${review?.id}`

    if(review){
        return (
            <div className="review">

                <div className="review-img">
                    <img src={review.product.image} width="90" height="90" alt=""/>
                </div>
                <div className="review-name">
                    <h4>{review.title}</h4>
                </div>
                <div className="review-info">
                    <p>{new Date(review.date).toLocaleDateString()}</p>
                    <span className="likes-and-comments-count">{review.likes}</span>
                    <svg width="20" height="20" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_77_706)">
                            <path d="M6.31915 11L5.54787 10.2807C2.80851 7.73569 1 6.05722 1 3.99727C1 2.3188 2.28723 1 3.92553 1C4.85106 1 5.73936 1.44142 6.31915 2.13896C6.89894 1.44142 7.78723 1 8.71277 1C10.3511 1 11.6383 2.3188 11.6383 3.99727C11.6383 6.05722 9.82979 7.73569 7.09043 10.2861L6.31915 11Z" fillOpacity="0.8" shapeRendering="crispEdges"/>
                        </g>
                        <defs>
                            <filter id="filter0_d_77_706" x="0" y="0" width="12.6387" height="12" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset/>
                                <feGaussianBlur stdDeviation="0.5"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_77_706"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_77_706" result="shape"/>
                            </filter>
                        </defs>
                    </svg>
                    <span className="likes-and-comments-count">{review.commentsCount}</span>
                    <svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.995 1C9.995 0.45 9.55 0 9 0H1C0.45 0 0 0.45 0 1V7C0 7.55 0.45 8 1 8H8L10 10L9.995 1ZM8 6H2V5H8V6ZM8 4.5H2V3.5H8V4.5ZM8 3H2V2H8V3Z"/>
                    </svg>
                    <Button variant="outline-danger" onClick={deleteReview}>
                        <svg width="12" height="12" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.33333 2C1.08787 2 0.888889 2.19898 0.888889 2.44444V7.2C0.888889 7.41217 0.982539 7.61566 1.14924 7.76569C1.31594 7.91571 1.54203 8 1.77778 8H6.22222C6.45797 8 6.68406 7.91571 6.85076 7.76569C7.01746 7.61566 7.11111 7.41217 7.11111 7.2V3C7.11111 2.44772 6.6634 2 6.11111 2H1.33333ZM6.49818 0.8C6.21447 0.8 5.94413 0.679497 5.75447 0.468508L5.63131 0.331492C5.44165 0.120503 5.1713 0 4.8876 0H3.1124C2.8287 0 2.55835 0.120502 2.36869 0.331492L2.24553 0.468508C2.05587 0.679497 1.78553 0.8 1.50183 0.8H0.4C0.179086 0.8 0 0.979086 0 1.2C0 1.42091 0.179086 1.6 0.4 1.6H7.6C7.82091 1.6 8 1.42091 8 1.2C8 0.979086 7.82091 0.8 7.6 0.8H6.49818Z" fill="#A30000" fillOpacity="0.8"/>
                        </svg>
                    </Button>
                    <Link to={route}>
                        <Button variant="outline-secondary">
                            <svg width="12" height="12" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.54286 1.45678L6.54312 3.45713L2.19964 7.80079L0.416253 7.99767C0.177509 8.02408 -0.0242047 7.8222 0.00235713 7.58345L0.200789 5.79873L4.54286 1.45678ZM7.78028 1.15896L6.84108 0.21973C6.54812 -0.0732434 6.07298 -0.0732434 5.78002 0.21973L4.89645 1.10334L6.89671 3.10368L7.78028 2.22008C8.07324 1.92695 8.07324 1.45194 7.78028 1.15896Z" fillOpacity="0.8"/>
                            </svg>
                        </Button>
                    </Link>
                    <Stars score={review.score} width={16} height={16}/>
                </div>
            </div>
        );
    }
    else return <p>No reviews yet</p>
};

export default SingleReview;