export interface Employee {
  id: string;
  name: string;
  surname: string;
  address: string;
  joiningDate: Date;
  bloodGroup: string;
  dob: Date;
  contactNo: string;
  emergencyContactNo?: string;
  designation: string;
  department: string;
  maritalStatus: string; // Updated for proper naming convention
  noOfChildren?: number; // Updated to match the optional field
  filePaths: string[];
  company: Company;
  image?: string;
  code: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: Date;
}
