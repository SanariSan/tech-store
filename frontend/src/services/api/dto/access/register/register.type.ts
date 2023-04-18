import type {
  IIncomingDTO,
  IIncomingFailureFields,
  IIncomingSuccessFields,
  IOutgoingDTO,
} from '../../dto.type';

type TAccessRegisterOutgoingFields = {
  email: string;
  username: string;
  password: string;
};

interface IAccessRegisterOutgoingDTO extends IOutgoingDTO {
  getFields: () => TAccessRegisterOutgoingFields;
}

interface IAccessRegisterIncomingSuccessFields extends IIncomingSuccessFields {
  data: {
    username: string;
    isAuthenticated: boolean;
  };
}

interface IAccessRegisterIncomingSuccessDTO extends IIncomingDTO {
  getFields: () => IAccessRegisterIncomingSuccessFields;
}

interface IAccessRegisterIncomingFailureFields extends IIncomingFailureFields {
  miscellaneous: {
    isAuthenticated: boolean;
  };
}

interface IAccessRegisterIncomingFailureDTO extends IIncomingDTO {
  getFields: () => IAccessRegisterIncomingFailureFields;
}

export type {
  IAccessRegisterOutgoingDTO,
  TAccessRegisterOutgoingFields,
  IAccessRegisterIncomingSuccessDTO,
  IAccessRegisterIncomingFailureDTO,
  IAccessRegisterIncomingSuccessFields,
  IAccessRegisterIncomingFailureFields,
};
