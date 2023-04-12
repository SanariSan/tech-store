import Joi from 'joi';

export const SCHEME_GOODS = {
  entitities: Joi.object().keys({
    category: Joi.string().min(1),
    subCategory: Joi.string().min(1),
    page: Joi.string().min(1),
  }),
  assets: Joi.object().keys({
    quality: Joi.string().valid('l', 'h').required(),
    filename: Joi.string().min(2).required(),
  }),
};
