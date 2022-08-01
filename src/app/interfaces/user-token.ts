export interface UserToken {
  email: string;
  fullName: string;
  token: Token;
  userId: number;
}
export interface Token {
  access_token: string;
}
