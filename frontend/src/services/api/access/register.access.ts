import { request } from '../../request-base.services';
import type { IAccessRegisterOutgoingDTO } from '../dto';
import { AccessRegisterIncomingFailureDTO, AccessRegisterIncomingSuccessDTO } from '../dto';
import { isExpectedFailureResponse, isExpectedSuccessResponse } from '../response-classify.api';
import { ROUTES } from '../routes.api.const';

export async function registerUser({
  dto,
  abortSignal,
}: {
  dto: IAccessRegisterOutgoingDTO;
  abortSignal: AbortSignal;
}) {
  try {
    const response: Response = await request({
      url: ROUTES.ACCESS.REGISTER,
      method: 'POST',
      body: JSON.stringify(dto.getFields()),
      abortSignal,
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    if (isExpectedSuccessResponse(response, parsedJsonResponse)) {
      return new AccessRegisterIncomingSuccessDTO(parsedJsonResponse);
    }
    if (isExpectedFailureResponse(response, parsedJsonResponse)) {
      return new AccessRegisterIncomingFailureDTO(parsedJsonResponse);
    }

    // here can report to monitoring service or smth, then throw
    const text = (await response.clone().text()).slice(200);
    console.error(text);
    throw new Error('Internal error');
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
