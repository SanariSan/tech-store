import { isArray, isNotEmptyObject } from '../../../../../helpers/util';
import { IncomingSuccessDTO } from '../../dto-success.incoming';
import type { IIncomingSuccessFields } from '../../dto.type';
import type {
  IGoodsCategoriesIncomingSuccessDTO,
  IGoodsCategoriesIncomingSuccessFields,
} from './categories.type';

export class GoodsCategoriesIncomingSuccessDTO
  extends IncomingSuccessDTO
  implements IGoodsCategoriesIncomingSuccessDTO
{
  protected readonly categories: IGoodsCategoriesIncomingSuccessFields['data']['categories'];

  protected readonly subCategories: IGoodsCategoriesIncomingSuccessFields['data']['subCategories'];

  constructor(parsedJsonObject: Partial<IIncomingSuccessFields>) {
    super(parsedJsonObject);

    this.categories =
      isArray(this.data.categories) && this.data.categories.every((_) => typeof _ === 'string')
        ? (this.data.categories as IGoodsCategoriesIncomingSuccessFields['data']['categories'])
        : [];

    this.subCategories =
      isNotEmptyObject(this.data.subCategories) &&
      Object.values(this.data.subCategories).every((_) => isArray(_))
        ? (this.data
            .subCategories as IGoodsCategoriesIncomingSuccessFields['data']['subCategories'])
        : {};
  }

  public getFields(): IGoodsCategoriesIncomingSuccessFields {
    return {
      data: {
        ...super.getFields().data,
        categories: this.categories,
        subCategories: this.subCategories,
      },
    };
  }
}
