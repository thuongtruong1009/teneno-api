import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = (data: string) => bcrypt.hash(data, SALT_ROUNDS);

export const comparePassword = (data: string, hash: string) =>
  bcrypt.compare(data, hash);
