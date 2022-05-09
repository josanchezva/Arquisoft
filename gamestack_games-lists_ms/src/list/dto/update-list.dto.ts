import { BaseListDto } from './base-list.dto';

export class UpdateListDto extends BaseListDto {
  completedAt: Date;
}
