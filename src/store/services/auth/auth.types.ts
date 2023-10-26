export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface TokenDecoded {
  isValidToken: boolean
  exp: number;
  iss: string;
  nome: string;
  sub: string;
}

export interface OptionalAuthPayload extends Partial<AuthPayload> {}