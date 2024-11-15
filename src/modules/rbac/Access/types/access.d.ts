export interface AllowanceHeads {
  user: string[];
  role: string[];
  group: string[];
}

export interface HasPermission {
  hasPermission: boolean;
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

interface permission {
  allowedFeatures: string[];
}

export interface createFeaturePermission {
  parentType: ParentType;
  parentId: string;
  allowedFeatures?: string[];
}
