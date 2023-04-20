import type { InferType } from 'yup';
import { boolean, object, string } from 'yup';
import { DEFAULT_FAILURE_DTO, MISCELLANEOUS } from '../dto.const';

const AccessRegisterOutgoingDTO = object({
  email: string().email().required(),
  username: string().required(),
  password: string().required(),
});

const AccessRegisterIncomingSuccessDTO = object({
  data: object({
    username: string().required(),
    isAuthenticated: boolean().required(),
  }),
});

const AccessRegisterIncomingFailureDTO = DEFAULT_FAILURE_DTO.shape({
  miscellaneous: MISCELLANEOUS.shape({
    isAuthenticated: boolean().required(),
  }),
});

type TAccessRegisterOutgoingFields = InferType<typeof AccessRegisterOutgoingDTO>;
type TAccessRegisterIncomingSuccessFields = InferType<typeof AccessRegisterIncomingSuccessDTO>;
type TAccessRegisterIncomingFailureFields = InferType<typeof AccessRegisterIncomingFailureDTO>;

export {
  AccessRegisterOutgoingDTO,
  AccessRegisterIncomingSuccessDTO,
  AccessRegisterIncomingFailureDTO,
};
export type {
  TAccessRegisterOutgoingFields,
  TAccessRegisterIncomingSuccessFields,
  TAccessRegisterIncomingFailureFields,
};
