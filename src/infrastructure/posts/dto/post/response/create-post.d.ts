export type ICreatePost = Omit<
    PostEntity,
    'postId' | 'favouritorId' | 'reactionType'
> &
    DefaultDto;
