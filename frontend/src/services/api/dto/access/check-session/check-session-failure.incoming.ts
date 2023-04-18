import { IncomingFailureDTO } from '../../dto-failure.incoming';
import type { IIncomingFailureFields } from '../../dto.type';
import type {
  IAccessCheckSessionIncomingFailureDTO,
  IAccessCheckSessionIncomingFailureFields,
} from './check-session.type';

export class AccessCheckSessionIncomingFailureDTO
  extends IncomingFailureDTO
  implements IAccessCheckSessionIncomingFailureDTO
{
  protected readonly isAuthenticated: IAccessCheckSessionIncomingFailureFields['miscellaneous']['isAuthenticated'];

  constructor(parsedJsonObject: Partial<IIncomingFailureFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.miscellaneous.isAuthenticated === 'boolean'
        ? this.miscellaneous.isAuthenticated
        : false;
  }

  public getFields(): IAccessCheckSessionIncomingFailureFields {
    const fields = super.getFields();
    return {
      ...fields,
      miscellaneous: {
        ...fields.miscellaneous,
        isAuthenticated: this.isAuthenticated,
      },
    };
  }
}
