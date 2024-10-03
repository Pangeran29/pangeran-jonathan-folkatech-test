import { User as IUser } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto implements Omit<IUser, | 'createdAt' | 'updatedAt'> {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsNumber()
  @IsNotEmpty()
  accountNumber: number;

  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;

  @IsNumber()
  @IsNotEmpty()
  identityNumber: number;
}
