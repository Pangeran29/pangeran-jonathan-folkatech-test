import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindUserByIdentityNumberDto {
  @IsNumber()
  @IsNotEmpty()
  identityNumber: number;
}
