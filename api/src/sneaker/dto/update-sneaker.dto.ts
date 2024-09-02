import { PartialType } from '@nestjs/mapped-types';

import { CreateSneakerDto } from './create-sneaker.dto';

export class UpdateSneakerDto extends PartialType(CreateSneakerDto) {}
