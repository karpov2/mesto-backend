const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    cardPost: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required().min(2).max(30),
            link: Joi.string().required().uri(),
            userId: Joi.string().alphanum().length(24),
        }),
    }),

    cardDelete: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().alphanum().length(24),
        }),
    }),

    cardLikePut: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().alphanum().length(24),
        }),
    }),

    cardLikeDelete: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().alphanum().length(24),
        }),
    }),
};
