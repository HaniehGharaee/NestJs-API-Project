import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../schema/user.schema';

export class CreateUserDto {
  // You should not get the fullName from the user!
  // Because this field is calculated, not entered.
  @IsNotEmpty({ message: 'firstName is required' })
  @IsString({ message: 'firstName must be a string' })
  @ApiProperty({
    description: 'Enter your firstName',
    example: 'Hanieh',
  })
  firstName: string;

  @IsNotEmpty({ message: 'lastName is required' })
  @IsString({ message: 'lastName must be a string' })
  @ApiProperty({
    description: 'Enter your lastName',
    example: 'Gharaee',
  })
  lastName: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a string' })
  @Length(11, 11, {
    message: 'Phone number must be exactly 11 characters long',
  })
  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only digits' })
  @ApiProperty({
    description: 'Phone number of the user',
    example: '1234567890',
  })
  phone: string;

  @IsNotEmpty({ message: 'username is required' })
  @IsString({ message: 'username must be a string' })
  @ApiProperty({
    description: 'Enter your username',
    example: 'admin@pharmacy',
  })
  username: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @ApiProperty({
    description: 'Enter your password',
    example: 'StrongPass@123',
  })
  @MinLength(6)
  password: string;

  @IsNotEmpty({ message: 'role is required' })
  @ApiProperty({
    enum: UserRole,
    example: UserRole.SUPER_ADMIN,
  })
  role: UserRole;

  @IsString({ message: 'pharmacyId must be a string' })
  @IsOptional()
  @ApiProperty({
    example: '676c91d9e6a30b78d3c4e412',
    required: false,
  })
  pharmacyId?: string;
}
