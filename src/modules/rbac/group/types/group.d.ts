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
  // companies:string[]
}

export interface GroupRole {
  id?:string;
   groupId: string;
   roleId: string;
   active:boolean;
   createdAt?: Date | null | undefined;
   updatedAt?: Date | null | undefined;
   isDeleted?: Date | null | undefined;
 }

 export interface UserGroup{
  id?:string;
   userId: string;
   groupId: string;
   active: boolean;
   createdAt?: Date | null | undefined;
   updatedAt?: Date | null | undefined;
   isDeleted?: Date | null | undefined;
 }
 
