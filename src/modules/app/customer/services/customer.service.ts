import customerModel from "../models/cutomer.model";
import { Customer } from "../../../../types/schema";
import { paginatedData } from "../../../../types/paginatedData";

class CustomerService {
  async getAllCustomers(): Promise<Customer[]> {
    return await customerModel.customer.gpFindMany();
  }

  async getCustomers(page: number, pageSize: number): Promise<paginatedData> {
    return await customerModel.customer.gpPgFindMany(page, pageSize);
  }

  async getDeletedCustomers(
    page: number,
    pageSize: number
  ): Promise<paginatedData> {
    return await customerModel.customer.gpPgFindDeletedMany(page, pageSize);
  }

  async createCustomer(
    customerData: Customer | Customer[]
  ): Promise<Customer | Customer[]> {
    return await customerModel.customer.gpCreate(customerData);
  }

  async updateCustomer(
    customerId: string,
    customerData: Customer
  ): Promise<Customer | null> {
    return await customerModel.customer.gpUpdate(customerId, customerData);
  }

  async deleteCustomer(customerId: string): Promise<void> {
    await customerModel.customer.gpSoftDelete(customerId);
  }

  async restoreCustomer(customerId: string): Promise<void> {
    await customerModel.customer.gpRestore(customerId);
  }

  async getCustomerById(customerId: string): Promise<Customer | null> {
    return await customerModel.customer.gpFindById(customerId);
  }

  async getTotalCustomers(): Promise<number> {
    return await customerModel.customer.gpCount();
  }

  async getFrequentCustomer() {
    return await customerModel.customer.getCustomersWithMostGatePasses();
  }

  async searchCustomer(
    searchTerm: string | string[],
    page: number,
    pageSize: number
  ): Promise<paginatedData> {
    const columns: string[] = ["name", "email", "phone", "address"];
    return await customerModel.customer.gpSearch(
      searchTerm,
      columns,
      page,
      pageSize
    );
  }

  async getTotal() {
    return await customerModel.customer.gpCount();
  }
}

export default CustomerService;
