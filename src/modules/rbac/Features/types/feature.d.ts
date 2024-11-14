export interface AppFeature {
    name: string;
    parentFeatureId?: string;
    label: string;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
    isDeleted?: Date | null | undefined;
  }
  