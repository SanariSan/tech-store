import { IncomingSuccessDTO } from '../../dto-success.incoming';
import type { IIncomingSuccessFields } from '../../dto.type';
import type {
  IAccessLoginIncomingSuccessDTO,
  IAccessLoginIncomingSuccessFields,
} from './login.type';

export class AccessLoginIncomingSuccessDTO
  extends IncomingSuccessDTO
  implements IAccessLoginIncomingSuccessDTO
{
  protected readonly isAuthenticated: IAccessLoginIncomingSuccessFields['data']['isAuthenticated'];

  protected readonly username: IAccessLoginIncomingSuccessFields['data']['username'];

  constructor(parsedJsonObject: Partial<IIncomingSuccessFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.data.isAuthenticated === 'boolean' ? this.data.isAuthenticated : false;
    this.username = typeof this.data.username === 'string' ? this.data.username : 'username';
  }

  public getFields(): IAccessLoginIncomingSuccessFields {
    return {
      data: {
        ...super.getFields().data,
        isAuthenticated: this.isAuthenticated,
        username: this.username,
      },
    };
  }
}
