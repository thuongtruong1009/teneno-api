export interface ICreatePost {
  id: string;
  title: string;
  description: string;
  files: string[];
  published: boolean;
  authorId: string;
  createdAt: Date;
}
