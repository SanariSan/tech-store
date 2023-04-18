import { IncomingFailureDTO } from '../../dto-failure.incoming';
import type { IIncomingFailureFields } from '../../dto.type';
import type {
  IGoodsCategoriesIncomingFailureDTO,
  IGoodsCategoriesIncomingFailureFields,
} from './categories.type';

export class GoodsCategoriesIncomingFailureDTO
  extends IncomingFailureDTO
  implements IGoodsCategoriesIncomingFailureDTO
{
  protected readonly stack: IGoodsCategoriesIncomingFailureFields['miscellaneous']['stack'];

  constructor(parsedJsonObject: Partial<IIncomingFailureFields>) {
    super(parsedJsonObject);

    this.stack =
      typeof this.miscellaneous.stack === 'string' ? this.miscellaneous.stack : undefined;
  }

  public getFields(): IGoodsCategoriesIncomingFailureFields {
    const fields = super.getFields();
    return {
      ...fields,
      miscellaneous: {
        ...fields.miscellaneous,
        stack: this.stack,
      },
    };
  }
}
