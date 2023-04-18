import { IncomingFailureDTO } from '../../dto-failure.incoming';
import type { IIncomingFailureFields } from '../../dto.type';
import type {
  IAccessLogoutIncomingFailureDTO,
  IAccessLogoutIncomingFailureFields,
} from './logout.type';

export class AccessLogoutIncomingFailureDTO
  extends IncomingFailureDTO
  implements IAccessLogoutIncomingFailureDTO
{
  protected readonly isAuthenticated: IAccessLogoutIncomingFailureFields['miscellaneous']['isAuthenticated'];

  constructor(parsedJsonObject: Partial<IIncomingFailureFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.miscellaneous.isAuthenticated === 'boolean'
        ? this.miscellaneous.isAuthenticated
        : false;
  }

  public getFields(): IAccessLogoutIncomingFailureFields {
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
