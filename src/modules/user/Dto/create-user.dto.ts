import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {
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

  @IsNotEmpty({ message: 'nationalId is required' })
  @IsString({ message: 'nationalId must be a string' })
  @Matches(/^[0-9]+$/, { message: 'nationalId must contain only digits' })
  @Length(10, 10, { message: 'nationalId must be exactly 10 digits long' })
  @ApiProperty({
    description: 'Enter your nationalId',
    example: '0020956071',
  })
  nationalId: string;

  @IsString({ message: 'role must be a string' })
  @ApiProperty({
    description: 'Enter role of user',
    example: 'admin',
  })
  role: string;

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
}
