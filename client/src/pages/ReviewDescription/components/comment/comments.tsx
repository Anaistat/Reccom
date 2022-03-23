import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {Comment} from "../../../../types";
import {useParams} from "react-router-dom";
import ReviewService from "../../../../services/ReviewService";
import SingleComment from "./singleComment"
import "./singleComment.scss"
import AppContext from "../../../../context/app.context";

const Comments:FC = () => {

    let [comments, setComments] = useState<Comment[]>([])
    const {id} = useParams()
    const {user} = useContext(AppContext)
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [likes, setLikes] = useState<number[]>([])
    let commentRef = useRef<HTMLTextAreaElement>(null)

    const likeStyle = {
        like: {
            stroke: '#821313',
            fill: '#821313'
        },
        dislike: {
            stroke: '#000000',
            fill: '#ffffff'
        }
    }

    useEffect(()=>{
        if(user){
            ReviewService.getUserLikes(user.id).then(setLikes).catch(err=>console.warn(err))
        }
    }, [user])


    useEffect(()=>{
        setIsLiked(likes.includes(Number(id)))
    }, [likes])


    const getAllComments = () =>{
        if(user){
            ReviewService.getComments(Number(id), user.uid).then(res=>setComments(res)).catch(err=>console.log(err))
        }
    }

    useEffect(()=>{
        getAllComments()
    }, [])

    const addComment = async () =>{
        if(commentRef?.current?.value && user){
            await ReviewService.addNewComment(user.uid, user.id, commentRef.current.value, Number(id))
            commentRef.current.value = ""
            getAllComments()
        }
    }

    const likeReview = async () =>{
        setIsLiked(prev=>!prev)
        if(user){
           (!isLiked)? await ReviewService.likeReview(user.uid, Number(id), user.id): await ReviewService.dislikeReview(Number(id), user.id)
        }
    }


    return (
        <>
            <div className="comments-container">
                <div className="write-comment">
                    <textarea placeholder="Write a comment" ref={commentRef}></textarea>
                    <button onClick={addComment} className="send-comment">
                        <svg width="25" height="25" viewBox="5 3 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.166 17.4998L27.1098 15.4436L18.9577 23.5811L18.9577 5.83317H16.041L16.041 23.5811L7.90352 15.429L5.83268 17.4998L17.4994 29.1665L29.166 17.4998Z"/>
                        </svg>
                    </button>
                    <svg width="30" height="30" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="like" onClick={likeReview}>
                        <path d="M8.88659 16.6603L8.88587 16.6596C6.30081 14.3155 4.19567 12.4057 2.73078 10.6147C1.27162 8.83074 0.5 7.22576 0.5 5.5C0.5 2.69614 2.69614 0.5 5.5 0.5C7.08861 0.5 8.62112 1.24197 9.61932 2.41417L10 2.8612L10.3807 2.41417C11.3789 1.24197 12.9114 0.5 14.5 0.5C17.3039 0.5 19.5 2.69614 19.5 5.5C19.5 7.22577 18.7284 8.83077 17.2691 10.6161C15.8065 12.4055 13.7058 14.3144 11.1265 16.6584L11.1148 16.669L11.1137 16.67L10.0013 17.675L8.88659 16.6603Z" style={isLiked?likeStyle.like:likeStyle.dislike}/>
                    </svg>
                </div>
            {
                comments.map(e=><SingleComment comment={e} key={e.id}/>)
            }
            </div>
        </>
    );
};

export default Comments;