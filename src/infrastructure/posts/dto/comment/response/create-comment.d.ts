export interface ICreateComment {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt?: Date;
  authorId: string;
  postId: string;
  reactions: Json[];
  replies: Json[];
}
