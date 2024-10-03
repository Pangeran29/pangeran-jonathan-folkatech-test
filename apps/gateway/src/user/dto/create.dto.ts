import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  accountNumber: number;

  @IsNotEmpty()
  emailAddress: string;

  @IsNotEmpty()
  identityNumber: number;
}
