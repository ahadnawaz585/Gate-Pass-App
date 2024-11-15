import blacklistTokenModel from "../models/token.model";
import { blackListedTokens } from "../types/token";

class BlackListedTokenService {
  async getAllTokens(): Promise<blackListedTokens[]> {
    return await blacklistTokenModel.blacklistToken.gpFindMany();
  }

  async createBlacListToken(
    token: string,
    id: string
  ): Promise<blackListedTokens | blackListedTokens[]> {
    return await blacklistTokenModel.blacklistToken.gpBlackListToken(token, id);
  }

  async isAuthenticatedToken(token: string): Promise<boolean> {
    return await blacklistTokenModel.blacklistToken.isTokenBlacklisted(token);
  }

  async deleteToken(yesterday: Date,sixMonth:Date) {
    return await blacklistTokenModel.blacklistToken.gpDeleteTokenBlackListed(yesterday,sixMonth);
  }
}

export default BlackListedTokenService;
