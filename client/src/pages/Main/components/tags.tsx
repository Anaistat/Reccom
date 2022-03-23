import React, {useContext, useEffect, useState} from 'react';
import './tags.scss'
import ReviewService from "../../../services/ReviewService";
import AppContext from "../../../context/app.context";

const Tags = () => {

    const [tags, setTags] = useState<string[]>([])
    const {setSearch} = useContext(AppContext)

    useEffect(()=>{
        ReviewService.getTags().then(res=>setTags(res)).catch(console.warn)
    }, [])

    return (
        <div className="tags-container">
            {
                tags.slice(0,10).map(e=><p key={"tag-" + e} className="tags-cloud" onClick={()=>setSearch(e)}>#{e}</p>)
            }
        </div>
    );
};

export default Tags;