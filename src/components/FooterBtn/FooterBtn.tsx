import { useDispatch } from "react-redux";

import { IFooterBtn } from "../../types/IFooterBtn";
import * as actions from "../../store/actions";
import styles from "./FooterBtn.module.scss";

const FooterBtn = () => {
  const dispatch = useDispatch<any>();
  return (
    <footer className={styles["footer"]}>
      <button onClick={() => dispatch(actions.showMore())}>Показать ещё</button>
      <button onClick={() => dispatch(actions.firstRender())}>
        На первую страницу
      </button>
    </footer>
  );
};

export default FooterBtn;
