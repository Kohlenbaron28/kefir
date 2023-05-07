import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IState } from "../../types/IState";
import { ICommentProps } from "../../types/ICommentProps";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import * as actions from "../../store/actions";

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
    e.stopPropagation();
    setLiked(!liked);
  };
  return (
    <li>
      <section>
        <div>
          <img src={avatar} alt="avatar" />
        </div>
        <div>
          <h2>{name}</h2>
          <span>{created}</span>
          <p>{text}</p>
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

const mapStateToProps = (state: IState) => {
  return {
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  const { incrementLikes, decrementLikes } = bindActionCreators(
    actions,
    dispatch
  );
  return {
    incrementLikes,
    decrementLikes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
