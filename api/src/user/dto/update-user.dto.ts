import { IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  username?: string;

  @IsString()
  password?: string;

  @IsString()
  roles?: string;
}
