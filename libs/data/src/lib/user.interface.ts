import { Id } from './id.type';

export interface UserIdentity {
  id: Id;
  name: string;
}

export interface UserInfo extends UserIdentity {
  emailAddress: string;
}

export interface UserLogin extends UserIdentity {
 username: string;
 password: string;
}


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface User extends UserInfo {}
