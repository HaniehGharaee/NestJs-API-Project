import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
@Injectable()
export class DashboardService {
  constructor() // private readonly customerRepo: CustomerRepository, // private readonly medicineRepo: MedicineRepository, // private readonly storeRepo: StoreRepository,
  // private readonly supplierRepo: SupplierRepository,
  // private readonly saleRepo: SaleRepository,
  // private readonly purchaseRepo: PurchaseRepository,
  // private readonly transactionRepo: TransactionRepository,
  // private readonly categoryRepo: CategoryRepository,
  {}

  async getSummery() {
    //pharmacyId: string
    const today = moment().startOf('day').toDate();
    const currentMonth = moment().startOf('month').toDate();
    const currentYear = moment().startOf('year').toDate();

    return {
      //   totalStores: await this.storeRepo.count(pharmacyId),
      //   totalMedicines: await this.medicineRepo.count(pharmacyId),
      //   totalCustomers: await this.customerRepo.count(pharmacyId),
      //   totalSuppliers: await this.supplierRepo.count(pharmacyId),

      //   totalProductSale: await this.saleRepo.countAll(pharmacyId),
      //   todayProductSale: await this.saleRepo.countByDate(pharmacyId, today),
      //   thisMonthSale: await this.saleRepo.countByMonth(pharmacyId, currentMonth),
      //   thisYearProductSale: await this.saleRepo.countByYear(
      //     pharmacyId,
      //     currentYear,
      //   ),

      //   totalProductPurchase: await this.purchaseRepo.countAll(pharmacyId),
      //   todayProductPurchase: await this.purchaseRepo.countByDate(
      //     pharmacyId,
      //     today,
      //   ),
      //   thisMonthPurchase: await this.purchaseRepo.countByMonth(
      //     pharmacyId,
      //     currentMonth,
      //   ),
      //   thisYearProductPurchase: await this.purchaseRepo.countByYear(
      //     pharmacyId,
      //     currentYear,
      //   ),

      //   totalEarning: await this.transactionRepo.totalEarning(pharmacyId),
      //   todayEarning: await this.transactionRepo.earningByDate(pharmacyId, today),
      //   thisMonthEarning: await this.transactionRepo.earningByMonth(
      //     pharmacyId,
      //     currentMonth,
      //   ),
      //   thisYearEarning: await this.transactionRepo.earningByYear(
      //     pharmacyId,
      //     currentYear,
      //   ),

      //   totalCategories: await this.categoryRepo.count(pharmacyId),
      //   totalTransactions: await this.transactionRepo.count(pharmacyId),
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
  async getSalesTrend(year: number) {
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
      sales: result, // [{month:1,total:5000}, {month:2,total:12000}, ...]
    };
  }
}
