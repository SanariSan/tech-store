import type { IIncomingDTO, IIncomingFailureFields } from './dto.type';

export class IncomingFailureDTO implements IIncomingDTO {
  protected readonly type: IIncomingFailureFields['type'];

  protected readonly title: IIncomingFailureFields['title'];

  protected readonly detail: IIncomingFailureFields['detail'];

  protected readonly miscellaneous: IIncomingFailureFields['miscellaneous'];

  constructor(parsedJsonObject: Partial<IIncomingFailureFields>) {
    const { type, title, detail, miscellaneous } = parsedJsonObject;
    this.type = typeof type === 'number' ? type : 0;
    this.title = typeof title === 'string' ? title : '';
    this.detail = typeof detail === 'string' ? detail : '';
    this.miscellaneous = typeof miscellaneous === 'object' ? miscellaneous : {};
  }

  public getFields() {
    return {
      type: this.type,
      title: this.title,
      detail: this.detail,
      miscellaneous: this.miscellaneous,
    };
  }
}
