import { AppFeature } from "../types/feature";
import prisma from "../../../../core/models/base.model";

const featureModel = prisma.$extends({
    model: {
      appFeature: {
        async getfeatureByName(this: any, name: string): Promise<boolean> {
          const feature = await this.findFirst({
            where: {
              name: name,
            },
          });
  
          if (feature) {
            return true;
          }
          return false;
        },
        
        async gpCount(userId: string, companyId?: string) {
          const count = await prisma.appFeature.count({
            where: {
              isDeleted: null,
            },
          });
          return count;
        },

        async gpGetByParent(this: any, parent: string): Promise<AppFeature[]> {
          const getParentAndChildren = async (
            parent: string
          ): Promise<AppFeature[]> => {
            const children = await this.findMany({
              where: {
                parentFeatureId: parent,
                isDeleted: null,
              },
            });
  
            const parentFeature = await this.findUnique({
              where: {
                name: parent,
                isDeleted: null,
              },
            });
  
            let data: AppFeature[] = [];
  
            if (parentFeature) {
              data.push(parentFeature);
            }
  
            for (const child of children) {
              const grandChildren = await getParentAndChildren(child.name);
              data = data.concat(grandChildren);
            }
  
            return data;
          };
  
          const data = await getParentAndChildren(parent);
  
          const uniqueData = Array.from(
            new Set(data.map((feature) => feature.name))
          ).map((id) => {
            return data.find((feature) => feature.name === id)!;
          });
  
          return uniqueData.map((item) => ({
            ...item,
            parentFeatureId:
              item.parentFeatureId === null ? undefined : item.parentFeatureId,
          }));
        },
      },
    },
  });

  export default featureModel;
