import { ParentType } from "@prisma/client";
import featurePermissionModel from "../models/featurePermission.model";
import {
  createFeaturePermission,
  FeaturePermission,
} from "../types/feature";

class FeaturePermissionService {
  async getAllFeaturePermissions(): Promise<FeaturePermission[]> {
    return await featurePermissionModel.featurePermission.gpFindMany();
  }

  async createFeaturePermission(permissionData: createFeaturePermission) {
    return await featurePermissionModel.featurePermission.gpCreate(
      permissionData
    );
  }

  async updateFeaturePermission(
    permissionId: string,
    permissionData: createFeaturePermission
  ) {
    return await featurePermissionModel.featurePermission.gpUpdate(
      permissionId,
      permissionData
    );
  }

  async gpGetAllowedFeatures(parentId:string,parentType:ParentType) {
    // console.log('Permission Data in service:', permissionData);
    return await featurePermissionModel.featurePermission.gpGetAllowedFeatures(
     parentType, parentId
    );
  }

  async deleteFeaturePermission(permissionId: string): Promise<void> {
    await featurePermissionModel.featurePermission.gpSoftDelete(permissionId);
  }

  async restoreFeaturePermission(permissionId: string): Promise<void> {
    await featurePermissionModel.featurePermission.gpRestore(permissionId);
  }

  async getById(permissionId: string): Promise<FeaturePermission[]> {
    return await featurePermissionModel.featurePermission.gpFindById(
      permissionId
      // userId
    );
  }
}

export default FeaturePermissionService;
