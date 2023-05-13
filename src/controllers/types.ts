export interface RegisterReqBody {
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface LoginReqBody {
  email: string;
  password: string;
}