import type { InferType } from 'yup';
import { array, lazy, object, string } from 'yup';
import { isNotEmptyObject } from '../../../../helpers/util';
import { DEFAULT_FAILURE_DTO } from '../dto.const';

// const CATEGORIES = ['laptops', 'phones', 'accessories'];

const GoodsCategoriesIncomingSuccessDTO = object({
  data: object({
    categories: array().of(string().required()).required(),
    // .test('categories names match test', 'categories mismatch', (testArr) =>
    // testArr.every((el, idx) => el === CATEGORIES[idx]),
    // ),
    // .length(3)
    // ---
    // subCategories is an object with dynamic keys, but persistent values format
    // so need to either have those keys from the start (1st appr.) or build validation in runtime (2 appr.)
    // ---
    // (1st appr.) declarative validation
    // subCategories: object(
    //   Object.fromEntries(CATEGORIES.map((el) => [el, array().of(string().required()).required()])),
    // ).required(),
    // ---
    // (2nd appr.) runtime build - validation
    subCategories: lazy((value) => {
      if (isNotEmptyObject(value)) {
        const newEntries = Object.fromEntries(
          Object.keys(value).map((val) => [val, array().of(string().required()).required()]),
        );

        return object().shape(newEntries);
      }
      return object().required();
    }),
  }),
});

const GoodsCategoriesIncomingFailureDTO = DEFAULT_FAILURE_DTO;

type TGoodsCategoriesIncomingSuccessFields = InferType<typeof GoodsCategoriesIncomingSuccessDTO>;
type TGoodsCategoriesIncomingFailureFields = InferType<typeof GoodsCategoriesIncomingFailureDTO>;

export { GoodsCategoriesIncomingSuccessDTO, GoodsCategoriesIncomingFailureDTO };
export type { TGoodsCategoriesIncomingSuccessFields, TGoodsCategoriesIncomingFailureFields };
