import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateAPIKeyDto {
  @IsString()
  @IsNotEmpty()
  tokenFor: string;
}
