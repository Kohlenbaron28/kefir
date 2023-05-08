import {IComment} from "./IState";

export interface ICommentProps {
    avatar?: string;
    name?: string;
    text: string;
    created: string;
    likes: number;
    childrenComments?: IComment[];
    type?: string;
}
