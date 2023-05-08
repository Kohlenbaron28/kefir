import {useEffect} from "react";
import {connect, useSelector} from "react-redux";
import {bindActionCreators} from "redux";

import {IState} from "../../types/IState";
import {ICommentsListProps} from "../../types/ICommentsListProps";
import Comment from "../Comment/Comment";
import * as actions from "../../store/actions";
import styles from "./CommentsList.module.scss";

const CommentsList = ({
    firstRender,
    comments,
    getAuthors,
}: ICommentsListProps) => {
    useEffect(() => {
        getAuthors();
        firstRender();
    }, []);
    const authors = useSelector((state: IState) => state.authors);

    const nestComments = (commentList: any) => {
        const commentMap: {[key: string]: any} = {};
        commentList.forEach(
            (comment: any) => (commentMap[comment.id] = comment),
        );
        commentList.forEach((comment: any) => {
            if (comment.parent !== null) {
                const parent = commentMap[comment.parent];
                parent &&
                    (parent.children = parent.children || []).push(comment);
            }
        });
        return commentList.filter((comment: any) => {
            return comment.parent === null;
        });
    };

    return (
        <ul className={styles["commentsList"]}>
            {nestComments(comments).map((comment: any) => {
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

const mapStateToProps = (state: IState) => {
    return {
        comments: state.comments,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    const {firstRender, getAuthors} = bindActionCreators(actions, dispatch);
    return {
        firstRender,
        getAuthors,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
