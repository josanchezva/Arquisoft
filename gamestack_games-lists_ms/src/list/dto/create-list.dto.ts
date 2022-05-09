import { BaseListDto } from './base-list.dto';

export class CreateListDto extends BaseListDto {
  UserID: string;
  VideogameID: string[];
}
