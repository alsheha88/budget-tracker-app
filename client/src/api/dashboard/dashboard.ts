import {type DashboardStats} from '../../../../shared/types'
import { api } from '../../lib/api';

export const getDashboard = async ():Promise<DashboardStats> => {
    const res = await api.get("/dashboard");

    return res.data.data.dashboardStats
};
