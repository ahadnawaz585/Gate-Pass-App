export interface blackListedTokens {
  token: string;
  userId: string;
  rememberMe?: boolean;
  groupId?: string
}

export interface LoggedInTokens {
  token?: string | null;
  rememberMe?: boolean;
  userId: string;
  groupId?: string
}
