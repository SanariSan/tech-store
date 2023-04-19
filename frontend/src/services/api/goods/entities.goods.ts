import { request } from '../../request-base.services';
import {
  GoodsEntitiesIncomingFailureDTO,
  GoodsEntitiesIncomingSuccessDTO,
  validateDTO,
} from '../dto';
import { ROUTES } from '../routes.api.const';

export async function getEntities({ abortSignal }: { abortSignal: AbortSignal }) {
  try {
    const response: Response = await request({
      url: ROUTES.GOODS.ENTITIES,
      abortSignal,
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    console.dir(parsedJsonResponse);

    if (response.status > 100 && response.status < 400) {
      return {
        success: await validateDTO({
          schema: GoodsEntitiesIncomingSuccessDTO,
          value: parsedJsonResponse,
        }),
      };
    }

    return {
      failure: await validateDTO({
        schema: GoodsEntitiesIncomingFailureDTO,
        value: parsedJsonResponse,
      }),
    };
  } catch (error) {
    console.error(error);
    throw new Error('Internal error');
  }
}
