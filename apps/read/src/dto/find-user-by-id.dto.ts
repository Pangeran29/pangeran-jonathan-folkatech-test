import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindUserByIdDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
