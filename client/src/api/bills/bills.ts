import type { BillsStatsRespoonse } from "../../../../shared/types";
import { api } from "../../lib/api";

export const getBillsStats = async (): Promise<BillsStatsRespoonse> => {
  const res = await api.get("/bills/stats");
  return res.data.data.billsStats;   // { bills, summary }
};