import { HeartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { IState } from "../../types/IState";
import styles from "./Header.module.scss";

const Header = () => {
  const commentsCount = useSelector((state: IState) => state.comments.length);
  const likes = useSelector((state: IState) => state.likes);

  return (
    <header className={styles["header"]}>
      <div>{commentsCount} комментариев</div>
      <div className={styles["header__likes"]}>
        <HeartOutlined /> {likes}
      </div>
    </header>
  );
};
export default Header;
