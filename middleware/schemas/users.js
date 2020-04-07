const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    getUserId: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().alphanum().length(24),
        }),
    }),

    putProfileUpdate: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required().min(2).max(30),
            about: Joi.string().required().min(2).max(30),
            userId: Joi.string().alphanum().length(24),
        }),
    }),

    putAvatarUpdate: celebrate({
        [Segments.BODY]: Joi.object().keys({
            avatar: Joi.string().required().uri(),
            userId: Joi.string().alphanum().length(24),
        }),
    }),
};
