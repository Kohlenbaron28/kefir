import { IComment, IState } from '../types/IState';

import { Constants } from './constants';

const initialState: IState = {
  comments: [],
  authors: [],
  page: 1,
  likes: 0,
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Constants.FIRST_RENDER: {
      const likesCount = action.data.data.reduce((acc: number, current: IComment) => acc + current.likes, 0);
      return {
        ...state,
        comments: [...action.data.data],
        likes: likesCount,
      };
    }
    case Constants.GET_AUTHORS:
      return {
        ...state,
        authors: [...action.data],
      };
    case Constants.SHOW_MORE: {
      const likesCount = action.data.data.reduce((acc: number, current: IComment) => acc + current.likes, 0);
      return {
        ...state,
        page: state.page + 1,
        comments: [...state.comments, ...action.data.data],
        likes: state.likes + likesCount,
      };
    }
    case Constants.INCREMENT_LIKES:
      return {
        ...state,
        likes: state.likes + 1,
      };
    case Constants.DECREMENT_LIKES:
      return {
        ...state,
        likes: state.likes - 1,
      };
    default:
      return state;
  }
};
