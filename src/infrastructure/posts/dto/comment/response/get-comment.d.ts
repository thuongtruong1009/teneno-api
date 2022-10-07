export type IGetComment = {
    total: number;
    comments: Array[{
        id: string;
        text: string;
        createAt: Date;
        updatedAt: Date;
        authorId: string;
        postId: string;
        reactions: [];
        replies: [];
    }];
};
