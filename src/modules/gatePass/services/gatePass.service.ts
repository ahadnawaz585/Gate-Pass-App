import gatePassModel from "../models/gatePass.model";
import { GatePass } from "../../../types/schema";
import { GatePassPDF } from "../../../pdf/gatePass";
import { DetailedGatePass, paginatedData } from "../../../types/paginatedData";
import { Status } from "../../../enums/schema";

class GatePassService {
  private pdfUtility: GatePassPDF = new GatePassPDF();

  async getAllGatePass(): Promise<GatePass[]> {
    return await gatePassModel.gatePass.gpFindMany();
  }

  async getGatePass(page: number, pageSize: number): Promise<paginatedData> {
    return await gatePassModel.gatePass.gpPgFindMany(page, pageSize);
  }

  async getDeletedGatePass(page: number, pageSize: number): Promise<paginatedData> {
    return await gatePassModel.gatePass.gpPgDeletedFindMany(page, pageSize);
  }

  async createGatePass(
    GatePassData: GatePass | GatePass[]
  ): Promise<GatePass | GatePass[]> {
    return await gatePassModel.gatePass.gpCreate(GatePassData);
  }

  async updateGatePass(
    GatePassId: string,
    GatePassData: GatePass
  ): Promise<GatePass | null> {
    return await gatePassModel.gatePass.gpUpdate(GatePassId, GatePassData);
  }

  async deleteGatePass(GatePassId: string): Promise<void> {
    await gatePassModel.gatePass.gpSoftDelete(GatePassId);
  }

  async restoreGatePass(GatePassId: string): Promise<void> {
    await gatePassModel.gatePass.gpRestore(GatePassId);
  }

  async getGatePassById(GatePassId: string): Promise<DetailedGatePass
  > {
    return await gatePassModel.gatePass.gpFindById(GatePassId);
  }

  async getGatePassByCustomer(GatePassId: string): Promise<DetailedGatePass[]> {
    return await gatePassModel.gatePass.gpFindByCustomerId(GatePassId);
  }

  async getGatePassByItem(itemId: string): Promise<DetailedGatePass[]> {
    return await gatePassModel.gatePass.gpFindByItemId(itemId);
  }

  async getTotal() {
    return await gatePassModel.gatePass.gpCount();
  }

  async approveGatePass(GatePassId: string) {
    await gatePassModel.gatePass.gpApprovePass(GatePassId);
  }

  async getTotalGatePass(): Promise<number> {
    return await gatePassModel.gatePass.gpCount();
  }

  async getDateFiltered(
    page: number,
    pageSize: number,
    from: Date,
    to: Date
  ): Promise<paginatedData> {
    return await gatePassModel.gatePass.gpPgDateFilter(
      page,
      pageSize,
      from,
      to
    );
  }

  async getStatusFilterd(
    page: number,
    pageSize: number,
    status: Status
  ): Promise<paginatedData> {
    return await gatePassModel.gatePass.gpPgStatusFilter(
      page,
      pageSize,
      status
    );
  }
}

export default GatePassService;
