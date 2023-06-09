import Joi from 'joi';

export const SCHEME_GOODS = {
  entitities: Joi.object().keys({
    category: Joi.string().min(1).optional(),
    modifier: Joi.string().min(1).optional(),
    qty: Joi.number().min(0).optional(),
    offset: Joi.number().min(0).optional(),
  }),
};
