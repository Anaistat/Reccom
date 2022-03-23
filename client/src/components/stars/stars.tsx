import React, {FC} from 'react';
import Star from "./Star";

type StarProps = {
    score: number,
    width: number,
    height: number
}

const Stars:FC<StarProps> = ({score, width, height}) => {
    return (
        <span>
            {
                Array(5).fill(undefined).map((e, index) => index < score ? <Star isFilled={true} key={index} width={width} height={height} /> : <Star isFilled={false} width={width} height={height}  key={index}/>)
            }
        </span>
    );
};

export default Stars;
