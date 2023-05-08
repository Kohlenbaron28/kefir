import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {IState, IComment} from "../../types/IState";
import {AppDispatch} from "../../types/IDispatch";
import Comment from "../Comment/Comment";
import * as actions from "../../store/actions";
import styles from "./CommentsList.module.scss";

const CommentsList = () => {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getAuthors());
        dispatch(actions.firstRender());
    }, []);
    const authors = useSelector((state: IState) => state.authors);
    const comments = useSelector((state: IState) => state.comments);
    const nestComments = (commentList: IComment[]) => {
        const commentMap: {[key: string]: any} = {};
        commentList.forEach((comment) => (commentMap[comment.id] = comment));
        commentList.forEach((comment) => {
            if (comment.parent !== null) {
                const parent = commentMap[comment.parent];
                parent &&
                    (parent.children = parent.children || []).push(comment);
            }
        });
        return commentList.filter((comment) => {
            return comment.parent === null;
        });
    };

    return (
        <ul className={styles["commentsList"]}>
            {nestComments(comments).map((comment) => {
                const pers = authors?.filter(
                    (el) => el.id === comment.author,
                )[0];
                return (
                    <Comment
                        key={comment.id}
                        avatar={pers?.avatar}
                        name={pers?.name}
                        created={comment.created}
                        likes={comment.likes}
                        text={comment.text}
                        childrenComments={comment.children}
                    />
                );
            })}
        </ul>
    );
};

export default CommentsList;
