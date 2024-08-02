import express, { Router } from 'express';
import ItemController from '../controllers/item';

class ItemRoutes {
  private router: Router;
  private controller: ItemController;

  constructor() {
    this.router = express.Router();
    this.controller = new ItemController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/get', this.controller.getAllItem.bind(this.controller));
    this.router.post('/get', this.controller.getItem.bind(this.controller));
    this.router.post('/getDeleted', this.controller.getDeletedItem.bind(this.controller));
    this.router.get('/total', this.controller.getTotalItem.bind(this.controller));
    this.router.post('/create', this.controller.createItem.bind(this.controller));
    this.router.put('/update', this.controller.updateItem.bind(this.controller));
    this.router.post('/delete', this.controller.deleteItem.bind(this.controller));
    this.router.post('/search', this.controller.searchItems.bind(this.controller));
    this.router.post('/getById', this.controller.getItemById.bind(this.controller));
    this.router.post('/restore', this.controller.restoreItem.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default ItemRoutes;
