import React, {FC} from 'react';
import "./reviewsPanel.scss"
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