export interface IState {
    comments: IComment[];
    authors: IAuthor[];
    page: number;
    likes: number;
}
export type IComment = {
    author: number;
    created: string;
    id: number;
    likes: number;
    parent: null | number;
    text: string;
    children?: IComment[];
};

export type IAuthor = {
    id: number;
    name: string;
    avatar: string;
};
