import { IsNotEmpty, IsString } from 'class-validator';

export class SetCacheDto {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  value: any;
}
