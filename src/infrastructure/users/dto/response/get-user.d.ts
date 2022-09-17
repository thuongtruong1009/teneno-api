export type IAllUsers = {
    total: number;
    orderBy: string;
    pageItems: number;
    pageLimit: number;
    pageCurrent: number;
    users: json[];
};

export type IPublicUser = Pick<UserEntity, 'username' | 'email'> &
    Omit<IDefault, 'updatedAt'> & {
        profile: json;
    };

export type IFindUserByEmail = Pick<UserEntity, 'username' | 'email'>;

export type IGetUserProfile = Pick<UserEntity, 'username' | 'email'> &
    IDefault & {
        profile: json;
    };
