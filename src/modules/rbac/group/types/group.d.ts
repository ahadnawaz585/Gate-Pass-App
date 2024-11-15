import { AllowanceHeads } from "../../Access/types/access";
export interface Group {
  id?: string;
  name: string;
  readAccess?: AllowanceHeads
  writeAccess?: AllowanceHeads
  createdAt?: Date | null | undefined;
  updatedAt?: Date | null | undefined;
  isDeleted?: Date | null | undefined;
}

export interface createGroup {
  name: string;
  users: string[];
  roles:string[];
  companies:string[]
}
