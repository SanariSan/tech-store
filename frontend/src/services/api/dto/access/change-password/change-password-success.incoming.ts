import { IncomingSuccessDTO } from '../../dto-success.incoming';
import type { IIncomingSuccessFields } from '../../dto.type';
import type {
  IAccessChangePasswordIncomingSuccessDTO,
  IAccessChangePasswordIncomingSuccessFields,
} from './change-password.type';

export class AccessChangePasswordIncomingSuccessDTO
  extends IncomingSuccessDTO
  implements IAccessChangePasswordIncomingSuccessDTO
{
  protected readonly isAuthenticated: IAccessChangePasswordIncomingSuccessFields['data']['isAuthenticated'];

  protected readonly username: IAccessChangePasswordIncomingSuccessFields['data']['username'];

  constructor(parsedJsonObject: Partial<IIncomingSuccessFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.data.isAuthenticated === 'boolean' ? this.data.isAuthenticated : false;
    this.username = typeof this.data.username === 'string' ? this.data.username : 'username';
  }

  public getFields(): IAccessChangePasswordIncomingSuccessFields {
    return {
      data: {
        ...super.getFields().data,
        isAuthenticated: this.isAuthenticated,
        username: this.username,
      },
    };
  }
}
