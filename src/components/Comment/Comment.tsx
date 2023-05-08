import {useState, useRef, memo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {formatDistanceToNow} from "date-fns";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {Spin} from "antd";

import {IState, IAuthor} from "../../types/IState";
import {AppDispatch} from "../../types/IDispatch";
import {ICommentProps} from "../../types/ICommentProps";
import * as actions from "../../store/actions";
import styles from "./Comment.module.scss";

const Comment = ({
    avatar,
    name,
    text,
    created,
    likes,
    childrenComments,
}: ICommentProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const authors = useSelector((state: IState) => state.authors);
    const resAuth: {current: IAuthor[]} = useRef(authors);
    const handleClick = async () => {
        await setLiked((prev: boolean) => !prev);
        if (!liked) {
            dispatch(actions.incrementLikes());
        } else dispatch(actions.decrementLikes());
    };

    const elems = useRef(
        childrenComments !== undefined && childrenComments.length > 0 ? (
            <ul>
                {childrenComments.map((child, i, arr) => {
                    arr.pop();
                    const pers = resAuth.current?.filter(
                        (el) => el.id === child.author,
                    )[0];
                    const MComment = memo(Comment);
                    return (
                        <MComment
                            avatar={pers && pers.avatar}
                            name={pers?.name}
                            created={child.created}
                            likes={child.likes}
                            text={child.text}
                            childrenComments={child.children}
                            key={child.id}
                            type="child"
                        />
                    );
                })}
            </ul>
        ) : null,
    );

    return (
        <li className={styles["comment"]}>
            <section>
                <div className={styles["comment__right"]}>
                    <div className={styles["comment__image"]}>
                        {avatar ? (
                            <img src={avatar} alt="avatar" loading="lazy" />
                        ) : (
                            <Spin
                                size="large"
                                style={{
                                    position: "relative",
                                    display: "flex",
                                    justifyContent: "center",
                                    top: 35,
                                }}
                            />
                        )}
                    </div>
                    <div className={styles["comment__text"]}>
                        <h2>{name}</h2>
                        <span className={styles["comment__time"]}>
                            {formatDistanceToNow(new Date(created))}
                        </span>
                        <p>{text}</p>
                    </div>
                </div>

                <figure onClick={handleClick}>
                    {liked ? <HeartFilled /> : <HeartOutlined />}
                    <figcaption>{liked ? ++likes : likes}</figcaption>
                </figure>
            </section>
            {elems.current}
        </li>
    );
};

export default Comment;
