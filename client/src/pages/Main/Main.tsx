import React, {FC, useContext} from 'react';
import "./main.scss"
import Tags from "./components/tags";
import CategoriesList from "./components/category/categoriesList";
import ReviewList from "./components/reviewCards/reviewList";
import {Link} from "react-router-dom";
import appLanguage from "../../language";
import AppContext from "../../context/app.context";

const Main:FC = () => {

    const {language, user} = useContext(AppContext)

    return (
        <main className="main-bg">
            <Tags/>
            <div className="main-container">
                <div className="categories">
                    <CategoriesList/>
                </div>
                <ReviewList/>
                <div className="add-review">
                    {
                        user &&
                        <Link to="/new-review"><button className="add-review-button">{appLanguage[language].addReview}</button></Link>
                    }
                </div>
            </div>
        </main>
    );
};

export default Main;