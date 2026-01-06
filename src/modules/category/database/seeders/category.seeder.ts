import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Category } from '../../category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategorySeeder {
  private readonly logger = new Logger();
  constructor(
    private readonly config: ConfigService,
    private readonly categoryModel: Model<Category>,
  ) {}
  async seed() {
    const seedCategoryDrug =
      this.config.get<string>('seed.categoryDrug') === 'true';
    const categoriesToSeed = [
      {
        name: 'Pharmaceutical Drugs',
        type: ['Ointment', 'Tablet', 'Syrup', 'Powder', 'Injectable'],
        isProtected: true,
      },
      {
        name: 'Supplements & Vitamins',
        type: ['Ointment', 'Tablet', 'Syrup', 'Powder', 'Injectable'],
        isProtected: true,
      },
      {
        name: 'Cosmetics & Personal Care',
        type: ['Ointment', 'Syrup', 'Powder'],
        isProtected: true,
      },
    ];
    for (const categoryData of categoriesToSeed) {
      if (
        categoryData.name === 'Pharmaceutical Drugs' &&
        seedCategoryDrug !== true
      ) {
        this.logger.warn('⛔ Drug category seeding disabled via .env');
        continue;
      }
      const exists = this.categoryModel.findOne({ name: categoryData.name });
      if (!exists) {
        await this.categoryModel.create(categoryData);
        this.logger.log(`✅ Category "${categoryData.name}" created`);
      }
    }
  }
}
