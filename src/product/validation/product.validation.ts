import * as Joi from 'joi';

export const VALIDATION = {
    createProduct: Joi.object({
        product_name: Joi.string().required(),
        product_code: Joi.string().required(),
        price: Joi.number().min(0),
    }),
};
