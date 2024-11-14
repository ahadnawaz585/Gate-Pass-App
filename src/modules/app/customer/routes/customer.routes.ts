import express, { Router } from 'express';
import CustomerController from '../controllers/customer';

class CustomerRoutes {
  private router: Router;
  private controller: CustomerController;

  constructor() {
    this.router = express.Router();
    this.controller = new CustomerController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getAllCustomers.bind(this.controller));
    this.router.get('/getFrequent', this.controller.getFrequentCustomers.bind(this.controller));
    this.router.post('/get', this.controller.getCustomers.bind(this.controller));
    this.router.post('/getDeleted', this.controller.getDeletedCustomers.bind(this.controller));
    this.router.get('/total', this.controller.getTotalCustomers.bind(this.controller));
    this.router.post('/create', this.controller.createCustomer.bind(this.controller));
    this.router.put('/update', this.controller.updateCustomer.bind(this.controller));
    this.router.post('/search', this.controller.searchCustomers.bind(this.controller));
    this.router.post('/delete', this.controller.deleteCustomer.bind(this.controller));
    this.router.post('/getById', this.controller.getCustomerById.bind(this.controller));
    this.router.post('/restore', this.controller.restoreCustomer.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default CustomerRoutes;
