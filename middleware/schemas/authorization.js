const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    authorization: celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().regex(/^[a-zA-Z0-9]{8,30}$/),
        }),
    }),
};
