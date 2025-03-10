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
  nationalId: string;
  role: string;
  firstName: string;
  lastName: string;
}
