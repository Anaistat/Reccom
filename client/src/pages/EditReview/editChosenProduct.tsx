import React, {FC, useContext, useEffect, useState} from 'react';
import AppContext from "../../context/app.context";
import {Product} from "../../types";
import ReviewService from "../../services/ReviewService";
import Preloader from "../../components/preloader/preloader";
import appLanguage from "../../language";
import ReviewTypeFlag from "../ReviewDescription/components/reviewTypeFlag";

type EditProductProps = {
    callback: (product: Product) => void
    chosenProduct: Product | undefined
}

const EditChosenProduct: FC<EditProductProps> = ({ callback, chosenProduct }) => {

    const {language} = useContext(AppContext)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([])
    const [load, setLoad] = useState<boolean>(true)

    useEffect(()=>{
        ReviewService.getAllProducts().then(res=>{
            setProducts(res)
            callback(res[0])
            setLoad(false)
        }).catch(err=>{
            console.warn(err)
            setLoad(false)
        })
    },[])

    if (load){
        return(
            <Preloader/>
        )
    }

    else if(chosenProduct) {
        return (
            <div className="product-container" style={{
                background: `linear-gradient(to right, rgba(0,0,0,.4), rgba(0,0,0,.4)), url(${chosenProduct.image})`,
            }}>
                <h2>{chosenProduct.title}</h2>
                <span className="change-title"
                      onClick={() => setIsModalOpen(prev => !prev)}>{appLanguage[language].changeTitle}</span>
                <div className="flag">
                    <ReviewTypeFlag category={chosenProduct.category}/>
                </div>
                <div className={isModalOpen ? "modal-choose-product open" : "modal-choose-product close"}>
                    <button className="modal-close-button" type="button"
                            onClick={() => setIsModalOpen(prev => !prev)}>x
                    </button>
                    {
                        products.map(e => {
                            return (
                            <button className="product-name"
                                           key={e.id}
                                           type="button"
                                           onClick={() => callback(e)}>
                                {e.title} - {e.category}
                            </button>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    return (
        <p>Error loading data</p>
    )

};

export default EditChosenProduct;