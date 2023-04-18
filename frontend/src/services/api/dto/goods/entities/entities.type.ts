import type {
  IIncomingDTO,
  IIncomingFailureFields,
  IIncomingSuccessFields,
  IOutgoingDTO,
} from '../../dto.type';

type TEntity = {
  id: string;
  name: string;
  price: number;
  category: string;
  subCategory: string;
  lsrc: string;
  hsrc: string;
};

type TGoodsEntitiesOutgoingFields = {
  category: string;
  subCategory: string;
  page: number;
};

interface IGoodsEntitiesOutgoingDTO extends IOutgoingDTO {
  getFields: () => TGoodsEntitiesOutgoingFields;
}

interface IGoodsEntitiesIncomingSuccessFields extends IIncomingSuccessFields {
  data: {
    entities: TEntity[];
  };
}

interface IGoodsEntitiesIncomingSuccessDTO extends IIncomingDTO {
  getFields: () => IGoodsEntitiesIncomingSuccessFields;
}

interface IGoodsEntitiesIncomingFailureFields extends IIncomingFailureFields {
  miscellaneous: {
    [key: string]: unknown;
  };
}

interface IGoodsEntitiesIncomingFailureDTO extends IIncomingDTO {
  getFields: () => IGoodsEntitiesIncomingFailureFields;
}

export type {
  TEntity,
  TGoodsEntitiesOutgoingFields,
  IGoodsEntitiesOutgoingDTO,
  IGoodsEntitiesIncomingFailureDTO,
  IGoodsEntitiesIncomingSuccessDTO,
  IGoodsEntitiesIncomingFailureFields,
  IGoodsEntitiesIncomingSuccessFields,
};
