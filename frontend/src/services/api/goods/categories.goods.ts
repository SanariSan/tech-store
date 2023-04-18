import { request } from '../../request-base.services';
import { GoodsCategoriesIncomingFailureDTO, GoodsCategoriesIncomingSuccessDTO } from '../dto';
import { isExpectedFailureResponse, isExpectedSuccessResponse } from '../response-classify.api';
import { ROUTES } from '../routes.api.const';

export async function getCategories({ abortSignal }: { abortSignal: AbortSignal }) {
  try {
    const response: Response = await request({
      url: ROUTES.GOODS.CATEGORIES,
      abortSignal,
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    console.dir(parsedJsonResponse);

    if (isExpectedSuccessResponse(response, parsedJsonResponse)) {
      return new GoodsCategoriesIncomingSuccessDTO(parsedJsonResponse);
    }
    if (isExpectedFailureResponse(response, parsedJsonResponse)) {
      return new GoodsCategoriesIncomingFailureDTO(parsedJsonResponse);
    }

    const text = (await response.clone().text()).slice(200);
    console.error(text);
    throw new Error('Internal error');
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
