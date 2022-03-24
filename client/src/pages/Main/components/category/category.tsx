import React, {FC} from 'react';
import {Link} from "react-router-dom";
import "./category.scss"

type CategoryProps = {
    icon: any,
    name: string,
    isActive: boolean,
    onClick: () => void
}

const Category:FC<CategoryProps> = ({icon, name, isActive, onClick}) => {
    return (
        <div>
            <h3 className={isActive?"category-link-active":"category-link-not-active"} onClick={onClick}>
                {icon}
                <span>{name}</span>
            </h3>
        </div>
    );
};

export default Category;