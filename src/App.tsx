import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";

import { reducer } from "./store/store";
import CommentsList from "./components/CommentsList/CommentsList";
import FooterBtn from "./components/FooterBtn/FooterBtn";
import Header from "./components/Header/Header";

const composeEnhancers =
  //@ts-ignore
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? //@ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

function loggerMiddleware(store: any) {
  return function (next: any) {
    return function (action: any) {
      const result = next(action);
      return result;
    };
  };
}

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(loggerMiddleware, thunk))
);

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <CommentsList />
        <FooterBtn />
      </div>
    </Provider>
  );
}

export default App;
