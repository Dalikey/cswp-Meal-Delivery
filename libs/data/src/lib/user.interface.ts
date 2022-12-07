import { Id } from './id.type';

export interface UserIdentity {
  id: Id;
  name: string;
}

export interface UserInfo extends UserIdentity {
  emailAddress: string;
  token: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister {
  username: string;
  password: string;
  emailAddress: string;
}

export interface User extends UserInfo {}
