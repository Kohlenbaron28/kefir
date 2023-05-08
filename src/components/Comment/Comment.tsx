import {useState, useCallback, useRef, memo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {formatDistanceToNow} from "date-fns";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";

import {IState} from "../../types/IState";
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
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const authors = useSelector((state: IState) => state.authors);
    const handleClick = useCallback(async () => {
        await setLiked((prev: any) => !prev);
        if (!liked) {
            dispatch(actions.incrementLikes());
        } else dispatch(actions.decrementLikes());
    }, []);

    const elems = useRef(
        childrenComments !== undefined && childrenComments.length > 0 ? (
            <ul>
                {childrenComments.map((child, i, arr) => {
                    arr.pop();
                    const pers = authors?.filter(
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
                        <img src={avatar} alt="avatar" />
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
