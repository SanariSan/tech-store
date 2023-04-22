import Joi from 'joi';

export const SCHEME_GOODS = {
  entitities: Joi.object().keys({
    category: Joi.string().min(1),
    subCategory: Joi.string().min(1),
    qty: Joi.number().min(0),
    offset: Joi.number().min(0),
  }),
  assets: Joi.object().keys({
    quality: Joi.string().valid('l', 'h').required(),
    filename: Joi.string().min(2).required(),
  }),
};
