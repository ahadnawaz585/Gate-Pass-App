import { ParentType } from "@prisma/client";
import { Prisma } from "@prisma/client";
import {
  createFeaturePermission,
  FeaturePermission} from "../types/feature"
import prisma from "../../../../core/models/base.model";

const featurePermissionModel = prisma.$extends({
  model: {
    featurePermission: {
      async gpCreate(this: any, permissionData: createFeaturePermission) {
        const newPermission = await prisma.featurePermission.create({
          data: {
            parentType: permissionData.parentType,
            parentId: permissionData.parentId,
            permissions: {
              allowedFeatures: permissionData.allowedFeatures,
            },
            createdAt: new Date(),
          },
        });
        return newPermission;
      },

      async gpGetAllowedFeatures(
        this: any,
        parentType: ParentType,
        parentId: string
      ) {
        try {
          const permission: {id:string, allowedFeatures: string[] }[] = await prisma.$queryRaw(
            Prisma.sql`SELECT id, COALESCE(permissions->'allowedFeatures', '[]'::jsonb) AS "allowedFeatures"
            FROM public."FeaturePermission"
            WHERE "parentId" = ${parentId} AND "parentType" = ${parentType}::"ParentType"`
          );
 
      
          if (permission.length === 0) {
            return [];
          }
          return permission[0];
        } catch (error) {
          console.error("Error fetching allowed features:", error);
          throw error;
        }
      }
,      

      async gpUpdate(
        this: any,
        id: string,
        permissionData: createFeaturePermission
      ) {
        const updatedItem = await this.update({
          where: { id: id },
          data: {
            parentType: permissionData.parentType,
            parentId: permissionData.parentId,
            permissions: {
              allowedFeatures: permissionData.allowedFeatures,
            },
            updatedAt: new Date(),
          },
        });
      },
    },
  },
});

export default featurePermissionModel;
