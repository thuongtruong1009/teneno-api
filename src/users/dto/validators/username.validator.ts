export const usenameValidateor = (username: string) => {
  if (username.length < 3) {
    throw new Error('Username must be at least 3 characters long');
  }
};
