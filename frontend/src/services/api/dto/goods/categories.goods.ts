import type { InferType, Schema } from 'yup';
import { array, object, string } from 'yup';
import { DEFAULT_FAILURE_DTO } from '../dto.const';

type TBase = {
  title: string;
};

type TCategories = TBase & {
  modifiers?: TBase[];
  sub?: TCategories[];
};

const maxDepth = 30;
const createNestedSchema = (depth = 0): Schema<TCategories> => {
  if (depth >= maxDepth) {
    return object({
      title: string().required(),
      modifiers: array()
        .of(
          object({
            title: string().required(),
          }),
        )
        .optional(),
    });
  }

  const schema = object({
    title: string().required(),
    modifiers: array()
      .of(
        object({
          title: string().required(),
        }),
      )
      .optional(),
    sub: array()
      .of(createNestedSchema(depth + 1))
      .optional(),
  });

  return schema;
};

const GoodsCategoriesIncomingSuccessDTO = object({
  data: object({
    categories: array().of(createNestedSchema()),
  }),
});

const GoodsCategoriesIncomingFailureDTO = DEFAULT_FAILURE_DTO;
type TGoodsCategoriesIncomingSuccessFields = InferType<typeof GoodsCategoriesIncomingSuccessDTO>;
type TGoodsCategoriesIncomingFailureFields = InferType<typeof GoodsCategoriesIncomingFailureDTO>;

export { GoodsCategoriesIncomingSuccessDTO, GoodsCategoriesIncomingFailureDTO };
export type { TGoodsCategoriesIncomingSuccessFields, TGoodsCategoriesIncomingFailureFields };
