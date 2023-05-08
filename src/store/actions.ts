import getCommentsRequest from "../api/comments/getCommentsRequest";
import getAuthorsRequest from "../api/authors/getAuthorsRequest";
import {IAuthor} from "../types/IState";

import {Constants} from "./constants";

export const firstRender = () => {
    return function (dispatch: any) {
        getCommentsRequest(1).then(async (data) => {
            await dispatch(getAuthors());
            dispatch({type: Constants.FIRST_RENDER, data});
        });
    };
};

export const getAuthors = () => {
    return function (dispatch: any) {
        getAuthorsRequest().then((data: IAuthor[]) => {
            dispatch({type: Constants.GET_AUTHORS, data});
        });
    };
};

export const showMore = () => {
    return function (dispatch: any, getState: any) {
        const newPage = getState().page + 1;
        getCommentsRequest(newPage).then((data) => {
            dispatch({type: Constants.SHOW_MORE, data});
        });
    };
};

export const incrementLikes = () => {
    return {type: Constants.INCREMENT_LIKES};
};

export const decrementLikes = () => {
    return {type: Constants.DECREMENT_LIKES};
};
