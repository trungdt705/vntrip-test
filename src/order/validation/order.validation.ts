import * as Joi from 'joi';

export const VALIDATION = {
    createOrder: Joi.object({
        products: Joi.array().items(Joi.string().required()),
        order_code: Joi.string().required(),
        order_type: Joi.string().valid('furniture', 'kitchen'),
        order_status: Joi.string().valid('pending', 'success', 'fail'),
        quantity: Joi.number().min(0),
        total_price: Joi.number(),
    }),
};
