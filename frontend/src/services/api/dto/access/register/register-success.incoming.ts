import { IncomingSuccessDTO } from '../../dto-success.incoming';
import type { IIncomingSuccessFields } from '../../dto.type';
import type {
  IAccessRegisterIncomingSuccessDTO,
  IAccessRegisterIncomingSuccessFields,
} from './register.type';

export class AccessRegisterIncomingSuccessDTO
  extends IncomingSuccessDTO
  implements IAccessRegisterIncomingSuccessDTO
{
  protected readonly isAuthenticated: IAccessRegisterIncomingSuccessFields['data']['isAuthenticated'];

  protected readonly username: IAccessRegisterIncomingSuccessFields['data']['username'];

  constructor(parsedJsonObject: Partial<IIncomingSuccessFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.data.isAuthenticated === 'boolean' ? this.data.isAuthenticated : false;
    this.username = typeof this.data.username === 'string' ? this.data.username : 'username';
  }

  public getFields(): IAccessRegisterIncomingSuccessFields {
    console.log({
      ...super.getFields().data,
    });

    return {
      data: {
        ...super.getFields().data,
        isAuthenticated: this.isAuthenticated,
        username: this.username,
      },
    };
  }
}
