import { PartialType } from '@nestjs/mapped-types';

import { CreateSizeDto } from './create-size.dto';
import { Sneaker } from '../../../sneaker/entities/sneaker.entity';

export class UpdateSizeDto extends PartialType(CreateSizeDto) {
  size: string;
  sneakers: Sneaker[];
}
