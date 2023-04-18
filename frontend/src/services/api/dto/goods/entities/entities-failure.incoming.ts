import { IncomingFailureDTO } from '../../dto-failure.incoming';
import type { IIncomingFailureFields } from '../../dto.type';
import type {
  IGoodsEntitiesIncomingFailureDTO,
  IGoodsEntitiesIncomingFailureFields,
} from './entities.type';

export class GoodsEntitiesIncomingFailureDTO
  extends IncomingFailureDTO
  implements IGoodsEntitiesIncomingFailureDTO
{
  protected readonly stack: IGoodsEntitiesIncomingFailureFields['miscellaneous']['stack'];

  constructor(parsedJsonObject: Partial<IIncomingFailureFields>) {
    super(parsedJsonObject);

    this.stack =
      typeof this.miscellaneous.stack === 'string' ? this.miscellaneous.stack : undefined;
  }

  public getFields(): IGoodsEntitiesIncomingFailureFields {
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
