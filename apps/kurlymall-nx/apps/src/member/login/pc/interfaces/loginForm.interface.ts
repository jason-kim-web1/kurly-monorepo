import { LoginStatus } from '../../../../shared/api/auth/token';

export interface LoginFormInterface {
  id: string;
  password: string;
  captcha: string;
  guestJwt?: string;
}

export interface LoginSuccess {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  canRecommendChangePassword: boolean;
  loginStatus: LoginStatus;
}
