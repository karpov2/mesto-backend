const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    registration: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required().min(2).max(30),
            about: Joi.string().required().min(2).max(30),
            avatar: Joi.string().required().uri(),
            email: Joi.string().required().email(),
            password: Joi.string().required().regex(/^[a-zA-Z0-9]{8,30}$/),
        }),
    }),
};
