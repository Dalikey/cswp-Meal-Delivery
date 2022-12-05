import { Id } from './id.type';

export interface UserIdentity {
  id: Id;
  name: string;
}

export interface UserInfo extends UserIdentity {
  emailAddress: string;
  token: string; // Bruh why is there left and right missing stuff like I hate find-a-buddy
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface User extends UserInfo {}
