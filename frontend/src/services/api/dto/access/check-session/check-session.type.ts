import type { IIncomingDTO, IIncomingFailureFields, IIncomingSuccessFields } from '../../dto.type';

interface IAccessCheckSessionIncomingSuccessFields extends IIncomingSuccessFields {
  data: {
    isAuthenticated: boolean;
  };
}

interface IAccessCheckSessionIncomingSuccessDTO extends IIncomingDTO {
  getFields: () => IAccessCheckSessionIncomingSuccessFields;
}

interface IAccessCheckSessionIncomingFailureFields extends IIncomingFailureFields {
  miscellaneous: {
    isAuthenticated: boolean;
  };
}

interface IAccessCheckSessionIncomingFailureDTO extends IIncomingDTO {
  getFields: () => IAccessCheckSessionIncomingFailureFields;
}

export type {
  IAccessCheckSessionIncomingFailureDTO,
  IAccessCheckSessionIncomingSuccessDTO,
  IAccessCheckSessionIncomingFailureFields,
  IAccessCheckSessionIncomingSuccessFields,
};
