import { AllowanceHeads } from "../../Access/types/access";

export interface Role {
  id?: string;
  name: string;
  readAccess?: AllowanceHeads
  writeAccess?: AllowanceHeads
  createdAt?: Date | null | undefined;
  updatedAt?: Date | null | undefined;
  isDeleted?: Date | null | undefined;
}

export interface createRole {
  name: string;
  users: string[];
  groups: string[]
}

