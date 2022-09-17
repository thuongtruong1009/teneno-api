export type IGetComment = {
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
