import GatePassItemModel from "../models/gatePassItem.model";
import {  GatePassItem } from "../../../types/schema";
import { paginatedData } from "../../../types/paginatedData";

class GatePassItemService {
  async getAllGatePassItem(): Promise<GatePassItem[]> {
    return await GatePassItemModel.gatePassItem.gpFindMany();
  }

  async getGatePassItem(page: number, pageSize: number): Promise<paginatedData> {
    return await GatePassItemModel.gatePassItem.gpPgFindMany(page, pageSize);
  }

  async createGatePassItem(GatePassItemData: GatePassItem | GatePassItem[]): Promise<GatePassItem | GatePassItem[]> {
    return await GatePassItemModel.gatePassItem.gpCreate(GatePassItemData);
  }

  async updateGatePassItem(GatePassItemId: string, GatePassItemData: GatePassItem): Promise<GatePassItem | null> {
    return await GatePassItemModel.gatePassItem.gpUpdate(GatePassItemId, GatePassItemData);
  }

  async deleteGatePassItem(GatePassItemId: string): Promise<void> {
    await GatePassItemModel.gatePassItem.gpSoftDelete(GatePassItemId);
  }

  async restoreGatePassItem(GatePassItemId: string): Promise<void> {
    await GatePassItemModel.gatePassItem.gpRestore(GatePassItemId);
  }

  async getGatePassItemById(GatePassItemId: string): Promise<GatePassItem | null> {
    return await GatePassItemModel.gatePassItem.gpFindById(GatePassItemId);
  }

  async getTotalGatePassItem(): Promise<number> {
    return await GatePassItemModel.gatePassItem.gpCount();
  }
}

export default GatePassItemService;
