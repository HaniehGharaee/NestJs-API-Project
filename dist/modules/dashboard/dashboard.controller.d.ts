import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboardSummery(req: any, res: any): Promise<any>;
    getSalesTrend(year: string): Promise<{
        year: number;
        sales: {
            month: number;
            total: number;
        }[];
    }>;
}
