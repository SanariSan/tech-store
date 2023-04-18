import type { IIncomingDTO, IIncomingFailureFields, IIncomingSuccessFields } from '../../dto.type';

type TCategories = string[];
type TSubCategories = Record<string, TCategories>;

interface IGoodsCategoriesIncomingSuccessFields extends IIncomingSuccessFields {
  data: {
    categories: TCategories;
    subCategories: TSubCategories;
  };
}

interface IGoodsCategoriesIncomingSuccessDTO extends IIncomingDTO {
  getFields: () => IGoodsCategoriesIncomingSuccessFields;
}

interface IGoodsCategoriesIncomingFailureFields extends IIncomingFailureFields {
  miscellaneous: {
    [key: string]: unknown;
  };
}

interface IGoodsCategoriesIncomingFailureDTO extends IIncomingDTO {
  getFields: () => IGoodsCategoriesIncomingFailureFields;
}

export type {
  TCategories,
  TSubCategories,
  IGoodsCategoriesIncomingFailureDTO,
  IGoodsCategoriesIncomingSuccessDTO,
  IGoodsCategoriesIncomingFailureFields,
  IGoodsCategoriesIncomingSuccessFields,
};
