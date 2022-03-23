import React, {FC, useContext, useEffect, useState} from 'react';
import "./productChose.scss"
import ReviewService from "../../../services/ReviewService";
import {Product} from "../../../types";
import ReviewTypeFlag from "../../ReviewDescription/components/reviewTypeFlag";
import Preloader from "../../../components/preloader/preloader";
import NewReviewContext from "../../../context/newReview.context";
import AppContext from '../../../context/app.context';
import appLanguage from '../../../language';

const ProductChose:FC = () => {

    const {language} = useContext(AppContext)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([])
    const [load, setLoad] = useState<boolean>(true)

    const {product, setProduct} = useContext(NewReviewContext)


    useEffect(()=>{
        ReviewService.getAllProducts().then(res=>{
            setProducts(res)
            setProduct(res[0])
            setLoad(false)
        }).catch(err=>{
            console.warn(err)
            setLoad(false)
        })
    }, [])


    if(load){
        return(
            <Preloader/>
        )
    }
    else{
        if(product){
            return (
                <div className="product-container" style={{
                    background: `linear-gradient(to right, rgba(0,0,0,.4), rgba(0,0,0,.4)), url(${product.image})`,
                }}>
                    <h2>{product.title}</h2>
                    <span className="change-title" onClick={()=>setIsModalOpen(prev=>!prev)}>{appLanguage[language].changeTitle}</span>
                    <div className="flag">
                        <ReviewTypeFlag category={product.category}/>
                    </div>
                    <div className={isModalOpen?"modal-choose-product open":"modal-choose-product close"}>
                        <button className="modal-close-button" type="button" onClick={()=>setIsModalOpen(prev=>!prev)}>x</button>
                        {
                            products.map(e=>{
                                return <button className="product-name" key={e.id} type="button" onClick={()=>setProduct(e)}>{e.title} - {e.category}</button>
                            })
                        }
                    </div>
                </div>
            );
        }
        else{
            return(
                <p>Error loading data</p>
            )
        }
    }
};

export default ProductChose;