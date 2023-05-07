import { HeartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { IState } from "../../types/IState";

const Header = () => {
  const commentsCount = useSelector((state: IState) => state.comments.length);
  const likes = useSelector((state: IState) => state.likes);

  return (
    <header>
      <div>{commentsCount} комментариев</div>
      <div>
        <HeartOutlined /> {likes}
      </div>
    </header>
  );
};
export default Header;
