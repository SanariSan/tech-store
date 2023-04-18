import { IncomingSuccessDTO } from '../../dto-success.incoming';
import type { IIncomingSuccessFields } from '../../dto.type';
import type {
  IAccessCheckSessionIncomingSuccessDTO,
  IAccessCheckSessionIncomingSuccessFields,
} from './check-session.type';

export class AccessCheckSessionIncomingSuccessDTO
  extends IncomingSuccessDTO
  implements IAccessCheckSessionIncomingSuccessDTO
{
  protected readonly isAuthenticated: IAccessCheckSessionIncomingSuccessFields['data']['isAuthenticated'];

  constructor(parsedJsonObject: Partial<IIncomingSuccessFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.data.isAuthenticated === 'boolean' ? this.data.isAuthenticated : false;
  }

  public getFields(): IAccessCheckSessionIncomingSuccessFields {
    return {
      data: {
        ...super.getFields().data,
        isAuthenticated: this.isAuthenticated,
      },
    };
  }
}
