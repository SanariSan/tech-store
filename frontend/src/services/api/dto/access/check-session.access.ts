import type { InferType } from 'yup';
import { boolean, object, string } from 'yup';
import { DEFAULT_FAILURE_DTO, MISCELLANEOUS } from '../dto.const';

const AccessCheckSessionIncomingSuccessDTO = object({
  data: object({
    username: string().notRequired(),
    isAuthenticated: boolean().required(),
  }),
});

const AccessCheckSessionIncomingFailureDTO = DEFAULT_FAILURE_DTO.shape({
  miscellaneous: MISCELLANEOUS.shape({
    isAuthenticated: boolean().required(),
  }),
});

type TAccessCheckSessionIncomingSuccessFields = InferType<
  typeof AccessCheckSessionIncomingSuccessDTO
>;
type TAccessCheckSessionIncomingFailureFields = InferType<
  typeof AccessCheckSessionIncomingFailureDTO
>;

export { AccessCheckSessionIncomingSuccessDTO, AccessCheckSessionIncomingFailureDTO };
export type { TAccessCheckSessionIncomingSuccessFields, TAccessCheckSessionIncomingFailureFields };
