import React, {FC, useContext} from 'react';
import Category from "./category";
import {useParams} from "react-router-dom";
import appLanguage from "../../../../language";
import AppContext from "../../../../context/app.context";
import "./categoriesList.scss"

const CategoriesList:FC = () => {

    const {category} = useParams()
    const {language} = useContext(AppContext)

    return (
        <nav className="categories-container">
            <Category icon={<svg width="29" height="38" viewBox="0 0 29 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.2188 0C17.2188 0 18.56 4.72105 18.56 8.55134C18.56 12.2213 16.1131 15.1964 12.3794 15.1964C8.6275 15.1964 5.8 12.2213 5.8 8.55134L5.85437 7.90999C2.19313 12.1857 0 17.7262 0 23.7478C0 31.6221 6.48875 38 14.5 38C22.5112 38 29 31.6221 29 23.7478C29 14.1453 24.3056 5.57618 17.2188 0ZM13.9744 32.6554C10.7481 32.6554 8.13812 30.1613 8.13812 27.0614C8.13812 24.1753 10.0413 22.1444 13.2313 21.503C16.4394 20.8617 19.7563 19.3474 21.605 16.9067C22.3119 19.2049 22.6744 21.6278 22.6744 24.1041C22.6744 28.8251 18.7775 32.6554 13.9744 32.6554Z"/>
                            </svg>}
                      name={appLanguage[language].popular}
                      isActive={category === "popular"}
                      href={"/popular"}
            />

            <Category icon={<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.648 8.352C18.9515 6.6555 16.733 5.8 14.5 5.8V14.5L8.352 20.648C11.745 24.041 17.255 24.041 20.6625 20.648C24.0555 17.255 24.0555 11.745 20.648 8.352ZM14.5 0C6.496 0 0 6.496 0 14.5C0 22.504 6.496 29 14.5 29C22.504 29 29 22.504 29 14.5C29 6.496 22.504 0 14.5 0ZM14.5 26.1C8.091 26.1 2.9 20.909 2.9 14.5C2.9 8.091 8.091 2.9 14.5 2.9C20.909 2.9 26.1 8.091 26.1 14.5C26.1 20.909 20.909 26.1 14.5 26.1Z"/>
            </svg>}
                      name={appLanguage[language].recent}
                      isActive={category === "recent"}
                      href={"/recent"}
            />
        </nav>
    );
};

export default CategoriesList;