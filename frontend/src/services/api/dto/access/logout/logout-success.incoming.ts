import { IncomingSuccessDTO } from '../../dto-success.incoming';
import type { IIncomingSuccessFields } from '../../dto.type';
import type {
  IAccessLogoutIncomingSuccessDTO,
  IAccessLogoutIncomingSuccessFields,
} from './logout.type';

export class AccessLogoutIncomingSuccessDTO
  extends IncomingSuccessDTO
  implements IAccessLogoutIncomingSuccessDTO
{
  protected readonly isAuthenticated: IAccessLogoutIncomingSuccessFields['data']['isAuthenticated'];

  constructor(parsedJsonObject: Partial<IIncomingSuccessFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.data.isAuthenticated === 'boolean' ? this.data.isAuthenticated : false;
  }

  public getFields(): IAccessLogoutIncomingSuccessFields {
    return {
      data: {
        ...super.getFields().data,
        isAuthenticated: this.isAuthenticated,
      },
    };
  }
}
