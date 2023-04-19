import type { InferType } from 'yup';
import { boolean, object, string } from 'yup';
import { DEFAULT_FAILURE_DTO, MISCELLANEOUS } from '../dto.const';

const AccessLoginOutgoingDTO = object({
  username: string().required(),
  password: string().required(),
});

const AccessLoginIncomingSuccessDTO = object({
  data: object({
    username: string().required(),
    isAuthenticated: boolean().required(),
  }),
});

const AccessLoginIncomingFailureDTO = DEFAULT_FAILURE_DTO.shape({
  miscellaneous: MISCELLANEOUS.shape({
    isAuthenticated: boolean().required(),
  }),
});

type TAccessLoginOutgoingFields = InferType<typeof AccessLoginOutgoingDTO>;
type TAccessLoginIncomingSuccessFields = InferType<typeof AccessLoginIncomingSuccessDTO>;
type TAccessLoginIncomingFailureFields = InferType<typeof AccessLoginIncomingFailureDTO>;

export { AccessLoginOutgoingDTO, AccessLoginIncomingSuccessDTO, AccessLoginIncomingFailureDTO };
export type {
  TAccessLoginOutgoingFields,
  TAccessLoginIncomingSuccessFields,
  TAccessLoginIncomingFailureFields,
};
