import React, {useState, useRef, useContext, FC} from 'react';
import "./newReview.scss"
import "../../App.css"
import {Button} from "react-bootstrap";
import ReviewService from "../../services/ReviewService";
import Star from "../../components/stars/Star";
import ProductChose from "../NewReview/components/productChose"
import MDEditor from '@uiw/react-md-editor';
import NewReviewContext from "../../context/newReview.context";
import {Product} from "../../types";
import AppContext from "../../context/app.context";
import appLanguage from '../../language';
import {useNavigate} from "react-router-dom";


const NewReview:FC = () => {

    const {language} = useContext(AppContext)

    const [tags, setTags] = useState<string[]>([])
    const [score, setScore] = useState<number>(0)
    const [text, setText] = useState<any>("");
    const {user} = useContext(AppContext)
    const [product, setProduct] = useState<Product | undefined>()

    const tagInput = useRef<HTMLInputElement>(null)
    const inputImages = useRef<HTMLInputElement>(null)
    const reviewNameInput = useRef<HTMLInputElement>(null)

    let navigate = useNavigate()

    const addTags = () => {
        if(tagInput?.current?.value){
            setTags([...tags, tagInput.current.value])
            tagInput.current.value = ""
        }
    }


    const sendForm = async () =>{
        if (inputImages?.current?.files && text && reviewNameInput?.current?.value && product && user && score){
            await ReviewService.addNewReview({
                title: reviewNameInput.current.value,
                product_id: product.id,
                author_id: user.id,
                tags: tags,
                images: inputImages.current.files,
                text: text.replace(/[']/g, "’"),
                score: score
            })
        }
        navigate('/')
    }

    return (
        <NewReviewContext.Provider value={{product, setProduct}}>
        <div className="new-review-container">
            <h1>{appLanguage[language].newReview}</h1>
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
                        <button onClick={addTags} type="button" className="addTag">+</button>
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
                    <ProductChose/>
                <div className="review-text">
                    <MDEditor
                        value={text}
                        onChange={setText}
                    />
                    <MDEditor.Markdown/>
                    <Button variant="outline-success" type="button" className="create-review-btn" onClick={sendForm} >{appLanguage[language].createReview}</Button>
                </div>
            </form>
        </div>
        </NewReviewContext.Provider>
    );
};

export default NewReview;