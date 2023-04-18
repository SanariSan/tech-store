import { IncomingFailureDTO } from '../../dto-failure.incoming';
import type { IIncomingFailureFields } from '../../dto.type';
import type {
  IAccessChangePasswordIncomingFailureDTO,
  IAccessChangePasswordIncomingFailureFields,
} from './change-password.type';

export class AccessChangePasswordIncomingFailureDTO
  extends IncomingFailureDTO
  implements IAccessChangePasswordIncomingFailureDTO
{
  protected readonly isAuthenticated: IAccessChangePasswordIncomingFailureFields['miscellaneous']['isAuthenticated'];

  protected readonly invalidParams: IAccessChangePasswordIncomingFailureFields['miscellaneous']['invalidParams'];

  constructor(parsedJsonObject: Partial<IIncomingFailureFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.miscellaneous.isAuthenticated === 'boolean'
        ? this.miscellaneous.isAuthenticated
        : false;

    this.invalidParams =
      typeof this.miscellaneous.invalidParams === 'object' &&
      Array.isArray(this.miscellaneous.invalidParams)
        ? this.miscellaneous.invalidParams
        : undefined;
  }

  public getFields(): IAccessChangePasswordIncomingFailureFields {
    const fields = super.getFields();
    return {
      ...fields,
      miscellaneous: {
        ...fields.miscellaneous,
        isAuthenticated: this.isAuthenticated,
        invalidParams: this.invalidParams,
      },
    };
  }
}
