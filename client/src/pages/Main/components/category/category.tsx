import React, {FC} from 'react';
import {Link} from "react-router-dom";
import "./category.scss"

type CategoryProps = {
    icon: any,
    name: string,
    isActive: boolean
    href: string
}

const Category:FC<CategoryProps> = ({icon, name, isActive, href}) => {
    return (
        <div>
            <Link to={href} className={isActive?"category-link-active":"category-link-not-active"}>
                {icon}
                <span>{name}</span>
            </Link>
        </div>
    );
};

export default Category;