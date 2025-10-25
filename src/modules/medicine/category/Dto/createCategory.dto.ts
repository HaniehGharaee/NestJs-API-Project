import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum categoryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of category',
    example: 'Tablet',
  })
  @IsNotEmpty({ message: 'Category name is required' })
  @IsString({ message: 'Category name must be a string' })
  categoryName: string;

  @ApiProperty({
    description: 'type of category',
    example: 'Drug',
  })
  @IsNotEmpty({ message: 'Type is required' })
  @IsString({ message: 'Type must be a string' })
  type: string;

  @ApiProperty({
    description: 'code of category',
    example: '0020',
  })
  @IsNotEmpty({ message: 'code is required' })
  //In the class-validator library, the definition (signature) of @IsNumber() is as follows:
  //IsNumber(options?: IsNumberOptions, validationOptions?: ValidationOptions)
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 0 }, //maxDecimalPlaces: just integer number
    { message: 'code must be a number' },
  )
  code: number;

  @ApiProperty({
    description: 'status of category',
    example: 'active',
  })
  @IsNotEmpty({ message: 'status is required' })
  @IsIn(Object.values(categoryStatus), {
    message: 'Status must be either "active" or "inactive"',
  })
  status: categoryStatus;
}
