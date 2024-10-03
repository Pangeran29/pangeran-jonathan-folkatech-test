import { IsNotEmpty, IsString } from 'class-validator';

export class GetCacheDto {
  @IsNotEmpty()
  @IsString()
  key: string;
}
