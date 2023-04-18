import type { IGoodsEntitiesOutgoingDTO, TGoodsEntitiesOutgoingFields } from './entities.type';

export class GoodsEntitiesOutgoingDTO implements IGoodsEntitiesOutgoingDTO {
  private readonly category: TGoodsEntitiesOutgoingFields['category'];

  private readonly subCategory: TGoodsEntitiesOutgoingFields['subCategory'];

  private readonly page: TGoodsEntitiesOutgoingFields['page'];

  constructor({ category, subCategory, page }: TGoodsEntitiesOutgoingFields) {
    this.category = category;
    this.subCategory = subCategory;
    this.page = page;
  }

  public getFields() {
    return {
      category: this.category,
      subCategory: this.subCategory,
      page: this.page,
    };
  }
}
