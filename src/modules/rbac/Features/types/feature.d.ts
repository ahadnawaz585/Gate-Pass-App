export interface AppFeature {
    name: string;
    parentFeatureId?: string;
    label: string;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
    isDeleted?: Date | null | undefined;
  }
  

  import { ParentType } from "@prisma/client";

export interface FeaturePermission {
  id?: string;
  parentType: ParentType;
  parentId: string;
  permission: permission;
  createdAt?: Date | null | undefined;
  updatedAt?: Date | null | undefined;
  isDeleted?: Date | null | undefined;
}

interface permission{
  allowedFeatures: string[];
 }

export interface createFeaturePermission {
  parentType: ParentType;
  parentId: string;
  allowedFeatures?: string[];
}




