import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IState } from "../../types/IState";
import { IFooterBtn } from "../../types/IFooterBtn";
import * as actions from "../../store/actions";

const FooterBtn = ({ showMore, firstRender }: IFooterBtn) => {
  return (
    <div>
      <button onClick={() => showMore()}>Показать ещё</button>
      <button onClick={() => firstRender()}>На первую страницу</button>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    comments: state.comments,
    page: state.page,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  const { showMore, firstRender } = bindActionCreators(actions, dispatch);
  return {
    showMore,
    firstRender,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterBtn);
