interface IIncomingSuccessFields {
  data: {
    [key: string]: unknown;
  };
}

interface IIncomingFailureFields {
  type: number;
  title: string;
  detail: string;
  miscellaneous: {
    // stack?: string;
    [key: string]: unknown;
  };
}

interface IIncomingDTO {
  getFields: () => IIncomingSuccessFields | IIncomingFailureFields;
}

interface IOutgoingDTO {
  getFields: () => { [key: string]: unknown } | void;
}

export type { IIncomingDTO, IOutgoingDTO, IIncomingFailureFields, IIncomingSuccessFields };
