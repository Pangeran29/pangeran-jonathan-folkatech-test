import { IsOptional } from 'class-validator';

export class UpdateDto {
  @IsOptional()
  userName?: string;

  @IsOptional()
  accountNumber?: number;

  @IsOptional()
  emailAddress?: string;

  @IsOptional()
  identityNumber?: number;
}
