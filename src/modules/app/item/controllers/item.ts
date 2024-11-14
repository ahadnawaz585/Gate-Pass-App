import { Request, Response } from "express";
import BaseController from "../../../../core/controllers/base.controller";
import itemService from "../services/item.service";
import { Item } from "../../../../types/schema";

class ItemController extends BaseController<itemService> {
  protected service = new itemService();

  async getAllItem(req: Request, res: Response) {
    const operation = () => this.service.getAllItem();
    const successMessage = "Item retrieved successfully!";
    const errorMessage = "Error retrieving Item:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getOutOfStockItem(req: Request, res: Response) {
    const operation = () => this.service.getOutOfStockItems();
    const successMessage = "out of stock Item retrieved successfully!";
    const errorMessage = "Error retrieving out of stock Item:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getItem(req: Request, res: Response) {
    const { page, pageSize } = req.body;
    const operation = () => this.service.getItem(page, pageSize);
    const successMessage = "Item retrieved successfully!";
    const errorMessage = "Error retrieving Item:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getDeletedItem(req: Request, res: Response) {
    const { page, pageSize } = req.body;
    const operation = () => this.service.getDeletedItem(page, pageSize);
    const successMessage = "Item retrieved successfully!";
    const errorMessage = "Error retrieving Item:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getTotalItem(req: Request, res: Response) {
    const operation = () => this.service.getTotalItem();
    const successMessage = "Total Item count retrieved successfully!";
    const errorMessage = "Error retrieving total Item count:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async createItem(req: Request, res: Response) {
    const ItemData: Item = req.body;
    const operation = () => this.service.createItem(ItemData);
    const successMessage = "Item created successfully!";
    const errorMessage = "Error creating Item:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async updateItem(req: Request, res: Response) {
    const { id, data } = req.body;
    const operation = () => this.service.updateItem(id, data);
    const successMessage = "Item updated successfully!";
    const errorMessage = "Error updating Item:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async deleteItem(req: Request, res: Response) {
    const { id } = req.body;
    const operation = () => this.service.deleteItem(id);
    const successMessage = "Item deleted successfully!";
    const errorMessage = "Error deleting Item:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async searchItems(req: Request, res: Response) {
    const { searchTerm, page, pageSize } = req.body;
    const operation = () =>
      this.service.searchItems(searchTerm, page, pageSize);
    const successMessage = "Items retrieved successfully!";
    const errorMessage = "Error retrieving Items:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async getItemById(req: Request, res: Response) {
    const { id } = req.body;
    const operation = () => this.service.getItemById(id);
    const successMessage = "Item retrieved successfully!";
    const errorMessage = "Error retrieving Item:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }

  async restoreItem(req: Request, res: Response) {
    const { id } = req.body;
    const operation = () => this.service.restoreItem(id);
    const successMessage = "Item restored successfully!";
    const errorMessage = "Error restoring Item:";
    this.handleRequest(operation, successMessage, errorMessage, res);
  }
}

export default ItemController;
