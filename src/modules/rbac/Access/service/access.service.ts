import accessModel from "../models/access.model";

class AccessService {
  async getUserGroup(id: string): Promise<any> {
    return await accessModel.user.getUserGroups(id);
  }

  async getUserRole(id: string): Promise<any> {
    return await accessModel.user.getUserRoles(id);
  }

  async getPermission(id: string, feature: string): Promise<boolean> {
    return await accessModel.user.isFeatureAllowed(id, feature);
  }

  async checkPermission(id: string, feature: string): Promise<boolean> {
    return await accessModel.user.checkUserPermission(id, feature);
  }
}

export default AccessService;
