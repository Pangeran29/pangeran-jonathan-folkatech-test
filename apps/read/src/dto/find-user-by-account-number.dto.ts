import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindUserByAccountNumberDto {
  @IsNumber()
  @IsNotEmpty()
  accountNumber: number;
}
