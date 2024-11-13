export interface JwtTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface JwtToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}
