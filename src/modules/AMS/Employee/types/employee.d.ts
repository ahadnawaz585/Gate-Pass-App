export interface Employee {
  id: string;
  name: string;
  surname: string;
  address: string;
  joiningDate: Date;
  bloodGroup: string;
  dob: Date;
  cnic:string;
  contactNo: string;
  emergencyContactNo?: string;
  designation: string;
  department: string;
  martialStatus: string; // Updated for proper naming convention
  noOfChildrens?: number; // Updated to match the optional field
  filePaths: string[];
  company: Company;
  image?: string;
  code: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: Date;
}
