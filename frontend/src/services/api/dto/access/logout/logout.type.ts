import type { IIncomingDTO, IIncomingFailureFields, IIncomingSuccessFields } from '../../dto.type';

interface IAccessLogoutIncomingSuccessFields extends IIncomingSuccessFields {
  data: {
    isAuthenticated: boolean;
  };
}

interface IAccessLogoutIncomingSuccessDTO extends IIncomingDTO {
  getFields: () => IAccessLogoutIncomingSuccessFields;
}

interface IAccessLogoutIncomingFailureFields extends IIncomingFailureFields {
  miscellaneous: {
    isAuthenticated: boolean;
  };
}

interface IAccessLogoutIncomingFailureDTO extends IIncomingDTO {
  getFields: () => IAccessLogoutIncomingFailureFields;
}

export type {
  IAccessLogoutIncomingFailureDTO,
  IAccessLogoutIncomingSuccessDTO,
  IAccessLogoutIncomingFailureFields,
  IAccessLogoutIncomingSuccessFields,
};
