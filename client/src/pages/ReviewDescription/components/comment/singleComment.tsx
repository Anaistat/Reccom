import React, {FC, useContext} from 'react';
import "./singleComment.scss"
import AppContext from "../../../../context/app.context";
import {Comment} from "../../../../types";

type CommentProps = {
    comment: Comment
}

const SingleComment:FC<CommentProps> = ({comment}) => {

    return (
            <div className="view-comments">
                <div>
                    <img src={comment.user.photo} alt="user" width="35" height="35" className="view-comments__user"/>
                </div>
                <div className="view-comments__info">
                    <span >{comment.user.name}</span>
                    <span className="comment-date">{new Date(comment.date).toLocaleDateString()}</span>
                    <p>{comment.text}</p>
                </div>
            </div>
    );
};

export default SingleComment;