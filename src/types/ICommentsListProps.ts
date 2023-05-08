import {IComment} from "./IState";

export interface ICommentsListProps {
    firstRender: () => void;
    comments: IComment[];
    getAuthors: () => void;
}
