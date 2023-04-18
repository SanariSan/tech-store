import { IncomingFailureDTO } from '../../dto-failure.incoming';
import type { IIncomingFailureFields } from '../../dto.type';
import type {
  IAccessRegisterIncomingFailureDTO,
  IAccessRegisterIncomingFailureFields,
} from './register.type';

export class AccessRegisterIncomingFailureDTO
  extends IncomingFailureDTO
  implements IAccessRegisterIncomingFailureDTO
{
  protected readonly isAuthenticated: IAccessRegisterIncomingFailureFields['miscellaneous']['isAuthenticated'];

  constructor(parsedJsonObject: Partial<IIncomingFailureFields>) {
    super(parsedJsonObject);

    this.isAuthenticated =
      typeof this.miscellaneous.isAuthenticated === 'boolean'
        ? this.miscellaneous.isAuthenticated
        : false;
  }

  public getFields(): IAccessRegisterIncomingFailureFields {
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
