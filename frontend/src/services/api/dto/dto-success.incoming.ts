import type { IIncomingDTO, IIncomingSuccessFields } from './dto.type';

export class IncomingSuccessDTO implements IIncomingDTO {
  protected data: IIncomingSuccessFields['data'];

  constructor(parsedJsonObject: Partial<IIncomingSuccessFields>) {
    const { data } = parsedJsonObject;
    this.data = typeof data === 'object' ? data : {};
  }

  public getFields() {
    return {
      data: this.data,
    };
  }
}
