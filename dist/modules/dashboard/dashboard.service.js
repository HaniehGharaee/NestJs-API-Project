"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
let DashboardService = class DashboardService {
    constructor() { }
    async getSummery() {
        const today = moment().startOf('day').toDate();
        const currentMonth = moment().startOf('month').toDate();
        const currentYear = moment().startOf('year').toDate();
        return {
            totalStores: await 100,
            totalMedicines: await 120,
            totalCustomers: await 130,
            totalSuppliers: await 140,
            totalProductSale: await 250,
            todayProductSale: await 1000,
            thisMonthSale: await 2570000,
            thisYearProductSale: await 150,
            totalProductPurchase: await 190,
            todayProductPurchase: await 2580,
            thisMonthPurchase: await 256,
            thisYearProductPurchase: await 589,
            totalEarning: await 578,
            todayEarning: await 741,
            thisMonthEarning: await 852,
            thisYearEarning: await 693,
            totalCategories: await 654,
            totalTransactions: await 100,
        };
    }
    async getSalesTrend(year) {
        const rawData = await this.orderRepo
            .createQueryBuilder('order')
            .select('EXTRACT(MONTH FROM order.createdAt)', 'month')
            .addSelect('SUM(order.totalPrice)', 'total')
            .where('EXTRACT(YEAR FROM order.createdAt) = :year', { year })
            .groupBy('month')
            .orderBy('month', 'ASC')
            .getRawMany();
        const result = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            total: 0,
        }));
        rawData.forEach((row) => {
            result[row.month - 1].total = +row.total;
        });
        return {
            year,
            sales: result,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map