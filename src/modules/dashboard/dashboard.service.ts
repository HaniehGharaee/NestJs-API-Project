import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  constructor(
    // private readonly storeRepo: StoreRepository,
    // private readonly medicineRepo: MedicineRepository,
    // private readonly customerRepo: CustomerRepository,
    // private readonly supplierRepo: SupplierRepository,
    // private readonly saleRepo: SaleRepository,
    // private readonly purchaseRepo: PurchaseRepository,
    // private readonly transactionRepo: TransactionRepository,
    // private readonly categoryRepo: CategoryRepository,
  ) {}

  async getSummery(userId: string){
    // const pharmacyId = user.pharmacyId;
    // const today = moment().startOf('day').toDate();
    // const currentMonth = moment().startOf('month').toDate();
    // const currentYear = moment().startOf('year').toDate();

    // return {
    //   totalStores: await this.storeRepo.count(pharmacyId),
    //   totalMedicines: await this.medicineRepo.count(pharmacyId),
    //   totalCustomers: await this.customerRepo.count(pharmacyId),
    //   totalSuppliers: await this.supplierRepo.count(pharmacyId),
    //   totalProductSale: await this.saleRepo.countAll(pharmacyId),
    //   todayProductSale: await this.saleRepo.countByDate(pharmacyId, today),
    //   thisMonthSale: await this.saleRepo.countByMonth(pharmacyId, currentMonth),
    //   thisYearProductSale: await this.saleRepo.countByYear(pharmacyId, currentYear),
    //   totalProductPurchase: await this.purchaseRepo.countAll(pharmacyId),
    //   todayProductPurchase: await this.purchaseRepo.countByDate(pharmacyId, today),
    //   thisMonthPurchase: await this.purchaseRepo.countByMonth(pharmacyId, currentMonth),
    //   thisYearProductPurchase: await this.purchaseRepo.countByYear(pharmacyId, currentYear),
    //   totalEarning: await this.transactionRepo.totalEarning(pharmacyId),
    //   todayEarning: await this.transactionRepo.earningByDate(pharmacyId, today),
    //   thisMonthEarning: await this.transactionRepo.earningByMonth(pharmacyId, currentMonth),
    //   thisYearEarning: await this.transactionRepo.earningByYear(pharmacyId, currentYear),
    //   totalCategories: await this.categoryRepo.count(pharmacyId),
    //   totalTransactions: await this.transactionRepo.count(pharmacyId),
    //};
  }
}
