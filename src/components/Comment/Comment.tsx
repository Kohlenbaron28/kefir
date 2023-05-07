import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

import { IState } from "../../types/IState";
import { ICommentProps } from "../../types/ICommentProps";
import * as actions from "../../store/actions";
import styles from "./Comment.module.scss";
import { url } from "inspector";

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
  useEffect(() => {
    if (liked) {
      dispatch(actions.incrementLikes());
    } else dispatch(actions.decrementLikes());
  }, [liked]);
  const authors = useSelector((state: IState) => state.authors);
  const handleClick = (e: any) => {
    setLiked(!liked);
    e.stopPropagation();
  };
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

        <figure onClick={(e) => handleClick(e)}>
          {liked ? <HeartFilled /> : <HeartOutlined />}
          <figcaption>{liked ? ++likes : likes}</figcaption>
        </figure>
      </section>
      {childrenComments !== undefined && childrenComments.length > 0 ? (
        <ul>
          {childrenComments.map((child, i, arr) => {
            arr.pop();
            const pers = authors?.filter((el) => el.id === child.author)[0];
            return (
              <Comment
                avatar={pers?.avatar}
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
      ) : null}
    </li>
  );
};

// const mapStateToProps = (state: IState) => {
//   return {
//     comments: state.comments,
//   };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   const { incrementLikes, decrementLikes } = bindActionCreators(
//     actions,
//     dispatch
//   );
//   return {
//     incrementLikes,
//     decrementLikes,
//   };
// };

export default Comment;
