import React, {FC, useEffect} from 'react';
import "./reviewsPanel.scss"
import {Button} from "react-bootstrap";
import Stars from "../../../components/stars/stars";
import {Review} from "../../../types";
import SingleReview from "./singleReview";

type ReviewsPanelProps = {
    reviews: Review[],
    callback: () => void
}


const ReviewsPanel:FC<ReviewsPanelProps> = ({reviews, callback}) => {

    return (
        <div className="reviews-panel-container">
            {
                reviews.map(e=><SingleReview key={e.id} review={e} callback={callback}/>)
            }
        </div>
    );
};

export default ReviewsPanel;