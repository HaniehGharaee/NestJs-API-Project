export declare class DashboardService {
    constructor();
    getSummery(): Promise<{
        totalStores: number;
        totalMedicines: number;
        totalCustomers: number;
        totalSuppliers: number;
        totalProductSale: number;
        todayProductSale: number;
        thisMonthSale: number;
        thisYearProductSale: number;
        totalProductPurchase: number;
        todayProductPurchase: number;
        thisMonthPurchase: number;
        thisYearProductPurchase: number;
        totalEarning: number;
        todayEarning: number;
        thisMonthEarning: number;
        thisYearEarning: number;
        totalCategories: number;
        totalTransactions: number;
    }>;
    getSalesTrend(year: number): Promise<{
        year: number;
        sales: {
            month: number;
            total: number;
        }[];
    }>;
}
