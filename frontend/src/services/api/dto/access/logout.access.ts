import type { InferType } from 'yup';
import { boolean, object } from 'yup';
import { DEFAULT_FAILURE_DTO, MISCELLANEOUS } from '../dto.const';

const AccessLogoutIncomingSuccessDTO = object({
  data: object({
    isAuthenticated: boolean().required(),
  }),
});

const AccessLogoutIncomingFailureDTO = DEFAULT_FAILURE_DTO.shape({
  miscellaneous: MISCELLANEOUS.shape({
    isAuthenticated: boolean().required(),
  }),
});

type TAccessLogoutIncomingSuccessFields = InferType<typeof AccessLogoutIncomingSuccessDTO>;
type TAccessLogoutIncomingFailureFields = InferType<typeof AccessLogoutIncomingFailureDTO>;

export { AccessLogoutIncomingSuccessDTO, AccessLogoutIncomingFailureDTO };
export type { TAccessLogoutIncomingSuccessFields, TAccessLogoutIncomingFailureFields };
