import React, {FC, useEffect, useState} from 'react';
import "./reviewTypeFlag.scss"
import {Category, Review} from "../../../types";
import {Flag} from "../../../utility";

type ReviewFlagProps = {
    category: Category
}

const ReviewTypeFlag:FC<ReviewFlagProps> = ({category}) => {


    return (
        <div className="review-flag-container" style={{
            background: Flag[category].background
        }}>
            <div>
                <svg width="28" height="28" viewBox="0 0 30 30"><path d={Flag[category].icon} fill='white'/></svg>
                <span>{category}</span>
            </div>
        </div>
    );
};

export default ReviewTypeFlag;