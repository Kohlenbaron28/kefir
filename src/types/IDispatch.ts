import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {IState} from "./IState";

export type AppDispatch = ThunkDispatch<IState, any, AnyAction>;
