export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  emailAddress: string;
  isGraduated: boolean;
  phoneNumber: string;
}

export interface Token {
  token: string;
}
