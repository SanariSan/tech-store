import { isArray, isNotEmptyObject } from '../../../../../helpers/util';
import { IncomingSuccessDTO } from '../../dto-success.incoming';
import type { IIncomingSuccessFields } from '../../dto.type';
import type {
  IGoodsEntitiesIncomingSuccessDTO,
  IGoodsEntitiesIncomingSuccessFields,
  TEntity,
} from './entities.type';

export class GoodsEntitiesIncomingSuccessDTO
  extends IncomingSuccessDTO
  implements IGoodsEntitiesIncomingSuccessDTO
{
  protected readonly entities: IGoodsEntitiesIncomingSuccessFields['data']['entities'];

  constructor(parsedJsonObject: Partial<IIncomingSuccessFields>) {
    super(parsedJsonObject);

    const entityProperties = new Set<keyof TEntity>([
      'id',
      'name',
      'price',
      'category',
      'subCategory',
      'lsrc',
      'hsrc',
    ]);

    this.entities =
      isArray(this.data.entities) &&
      this.data.entities.every(
        (_) =>
          isNotEmptyObject(_) &&
          Object.keys(_).every((_x) => entityProperties.has(_x as keyof TEntity)),
      )
        ? (this.data.entities as IGoodsEntitiesIncomingSuccessFields['data']['entities'])
        : [];
  }

  public getFields(): IGoodsEntitiesIncomingSuccessFields {
    return {
      data: {
        ...super.getFields().data,
        entities: this.entities,
      },
    };
  }
}
