export interface LoginResponse {
  retrieveToken: {
    ok: boolean;
    token: string;
  };
}

export interface UserCreateInput {
  lineUserId: string;
  appUuid: string;
}
