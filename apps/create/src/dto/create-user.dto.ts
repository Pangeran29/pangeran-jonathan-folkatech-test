import { User as IUser } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto implements Omit<IUser, 'id' | 'createdAt' | 'updatedAt'> {
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
