import { isNotEmptyObject } from '../../helpers/util';
import type { IIncomingFailureFields, IIncomingSuccessFields } from './dto';

function isExpectedSuccessResponse(
  response: Response,
  parsedJsonResponse: unknown,
): parsedJsonResponse is IIncomingSuccessFields {
  return (
    isNotEmptyObject(parsedJsonResponse) &&
    response.status > 100 &&
    response.status < 400 &&
    parsedJsonResponse.data !== undefined
  );
}

function isExpectedFailureResponse(
  response: Response,
  parsedJsonResponse: unknown,
): parsedJsonResponse is IIncomingFailureFields {
  return (
    isNotEmptyObject(parsedJsonResponse) &&
    response.status > 400 &&
    parsedJsonResponse.type !== undefined &&
    parsedJsonResponse.title !== undefined &&
    parsedJsonResponse.detail !== undefined &&
    parsedJsonResponse.miscellaneous !== undefined
  );
}

export { isExpectedFailureResponse, isExpectedSuccessResponse };
