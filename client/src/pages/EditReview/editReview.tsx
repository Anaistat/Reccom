import React, {useState, useRef, useContext, FC, useEffect} from 'react';
import "../NewReview/newReview.scss"
import "../../App.css"
import {Button} from "react-bootstrap";
import Star from "../../components/stars/Star";
import ProductChose from "../NewReview/components/productChose"
import MDEditor from '@uiw/react-md-editor';
import EditReviewContext from "../../context/editReview.context";
import {Product, Review} from "../../types";
import AppContext from "../../context/app.context";
import appLanguage from '../../language';
import {useNavigate, useParams} from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import EditChosenProduct from "./editChosenProduct";

const EditReview:FC = () => {

    const [reviewId, setReviewId] = useState<number>(0)
    const [tags, setTags] = useState<string[]>([])
    const [score, setScore] = useState<number>(0)
    const [text, setText] = useState<any>("");
    const [date, setDate] = useState<string>('')
    const {user, language} = useContext(AppContext)
    const [product, setProduct] = useState<Product | undefined>()

    const tagInput = useRef<HTMLInputElement>(null)
    const inputImages = useRef<HTMLInputElement>(null)
    const reviewNameInput = useRef<HTMLInputElement>(null)
    const {id} = useParams()

    const setProductCallback = (product: Product) => setProduct(product)
    let navigate = useNavigate()



    const sendForm = async () => {
        if (inputImages?.current?.files && text && reviewNameInput?.current?.value && product && user && score){
            console.log(123)
            await ReviewService.updateReview({
                id: reviewId,
                title: reviewNameInput.current.value,
                product_id: product.id,
                tags: tags,
                images: inputImages.current.files,
                text: text,
                score: score,
                date
            })
        }
        navigate('/popular')
    }

    const addTags = () => {
        if(tagInput?.current?.value){
            setTags([...tags, tagInput.current.value])
            tagInput.current.value = ""
        }
    }

    useEffect(()=>{
        if(user){
            ReviewService.getReview(Number(id)).then(res=>{
                if (!res) return
                setScore(res.score)
                setText(res.text)
                setProduct(res.product)
                setReviewId(res.id)
                setTags(res.tags)
                setDate(res.date.toString())
                if (reviewNameInput?.current){
                    reviewNameInput.current.value = res.title
                }
            }).catch(console.warn)
        }
    }, [user])

    return (
        <EditReviewContext.Provider value={{product, setProduct}}>
            <div className="new-review-container">
                <h1>Edit review</h1>
                <form>
                    <div className="field-names">
                        <p>{appLanguage[language].reviewName}</p>
                        <p>{appLanguage[language].tags}</p>
                        <p>{appLanguage[language].images}</p>
                        <p>{appLanguage[language].reviewScore}</p>
                    </div>
                    <div className="input-fields">
                        <input type="text" name="review" ref={reviewNameInput}/>
                        <div>
                            {tags.map((e, index)=><span key={index} className="added-info">#{e}</span>)}
                            <input type="text" className="info-field" name="tags-input" ref={tagInput}/>
                            <button type="button" className="addTag" onClick={addTags}>+</button>
                        </div>
                        <div>
                            <input type="file" name="images" accept=".jpg, .jpeg, .png" multiple ref={inputImages}/>
                        </div>

                        <div className="rating">
                            {
                                Array(5).fill(0).map( (star, index) => <div key={"star"+index} onClick={()=>setScore(index + 1)}><Star isFilled={score > index} width={30} height={30}/></div>)
                            }
                        </div>
                    </div>
                    <EditChosenProduct callback={setProductCallback} chosenProduct={product}/>
                    <div className="review-text">
                        <MDEditor
                            value={text}
                            onChange={setText}
                        />
                        <MDEditor.Markdown/>
                        <Button variant="outline-success" type="button" onClick={sendForm}>Edit</Button>
                    </div>
                </form>
            </div>
        </EditReviewContext.Provider>
    );
};

export default EditReview;