import type {
  IIncomingDTO,
  IIncomingFailureFields,
  IIncomingSuccessFields,
  IOutgoingDTO,
} from '../../dto.type';

type TAccessChangePasswordOutgoingFields = {
  oldPassword: string;
  newPassword: string;
};

interface IAccessChangePasswordOutgoingDTO extends IOutgoingDTO {
  getFields: () => TAccessChangePasswordOutgoingFields;
}

interface IAccessChangePasswordIncomingSuccessFields extends IIncomingSuccessFields {
  data: {
    username: string;
    isAuthenticated: boolean;
  };
}

interface IAccessChangePasswordIncomingSuccessDTO extends IIncomingDTO {
  getFields: () => IAccessChangePasswordIncomingSuccessFields;
}

interface IAccessChangePasswordIncomingFailureFields extends IIncomingFailureFields {
  miscellaneous: {
    isAuthenticated: boolean;
    invalidParams?: Array<{ name: string; reason: string }>;
  };
}

interface IAccessChangePasswordIncomingFailureDTO extends IIncomingDTO {
  getFields: () => IAccessChangePasswordIncomingFailureFields;
}

export type {
  IAccessChangePasswordOutgoingDTO,
  TAccessChangePasswordOutgoingFields,
  IAccessChangePasswordIncomingFailureDTO,
  IAccessChangePasswordIncomingFailureFields,
  IAccessChangePasswordIncomingSuccessDTO,
  IAccessChangePasswordIncomingSuccessFields,
};
