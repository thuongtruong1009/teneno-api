export interface IAllUsers {
  total: number;
  orderBy: string;
  pageItems: number;
  pageLimit: number;
  pageCurrent: number;
  users: json[];
}

export interface IPublicUser {
  id: string;
  username: string;
  email: string;
  profile: json;
  createdAt: Date;
}

export interface IFindUserByEmail {
  username: string;
  email: string;
}

export interface IGetUserProfile {
  id: string;
  username: string;
  email: string;
  profile: json;
  createdAt: Date;
  updatedAt: Date;
}
