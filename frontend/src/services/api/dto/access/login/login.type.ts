import type {
  IIncomingDTO,
  IIncomingFailureFields,
  IIncomingSuccessFields,
  IOutgoingDTO,
} from '../../dto.type';

type TAccessLoginOutgoingFields = {
  username: string;
  password: string;
};

interface IAccessLoginOutgoingDTO extends IOutgoingDTO {
  getFields: () => TAccessLoginOutgoingFields;
}

interface IAccessLoginIncomingSuccessFields extends IIncomingSuccessFields {
  data: {
    username: string;
    isAuthenticated: boolean;
  };
}

interface IAccessLoginIncomingSuccessDTO extends IIncomingDTO {
  getFields: () => IAccessLoginIncomingSuccessFields;
}

interface IAccessLoginIncomingFailureFields extends IIncomingFailureFields {
  miscellaneous: {
    isAuthenticated: boolean;
  };
}

interface IAccessLoginIncomingFailureDTO extends IIncomingDTO {
  getFields: () => IAccessLoginIncomingFailureFields;
}

export type {
  TAccessLoginOutgoingFields,
  IAccessLoginOutgoingDTO,
  IAccessLoginIncomingFailureDTO,
  IAccessLoginIncomingFailureFields,
  IAccessLoginIncomingSuccessDTO,
  IAccessLoginIncomingSuccessFields,
};
