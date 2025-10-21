import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum categoryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Category name is required' })
  @IsString({ message: 'Category name must be a string' })
  categoryName: string;

  @IsNotEmpty({ message: 'Type is required' })
  @IsString({ message: 'Type must be a string' })
  type: string;

  @IsNotEmpty({ message: 'code is required' })
  //In the class-validator library, the definition (signature) of @IsNumber() is as follows:
  //IsNumber(options?: IsNumberOptions, validationOptions?: ValidationOptions)
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 0 }, //maxDecimalPlaces: just integer number
    { message: 'code must be a number' },
  )
  code: number;

  @IsNotEmpty({ message: 'status is required' })
  @IsIn(Object.values(categoryStatus), {
    message: 'Status must be either "active" or "inactive"',
  })
  status: categoryStatus;
}
