import React, {FC} from 'react';
import "./reviewSlider.scss"
import {Review} from "../../../types";
import Carousel from 'react-bootstrap/Carousel'


type SliderProps = {
    name: string,
    score: Review["score"],
    images: Review["images"]
}

const ReviewSlider:FC<SliderProps> = ({name, score, images}) => {
    
    return (
    <div className="slider-container">
        <Carousel fade>

            {
                images.map((e, i)=>{
                   return <Carousel.Item className="carousel-item" key={'slider-' + i}>
                        <img
                            className="d-block w-100"
                            src={e}
                            alt="First slide"
                        />
                    </Carousel.Item>
                })
            }
        </Carousel>
    </div>
    );
};

export default ReviewSlider;