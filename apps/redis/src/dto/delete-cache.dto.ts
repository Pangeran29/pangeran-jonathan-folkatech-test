import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCacheDto {
  @IsNotEmpty()
  @IsString()
  key: string;
}
