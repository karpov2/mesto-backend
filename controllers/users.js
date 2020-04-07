const User = require('../models/user');
const NotFoundError = require('../middleware/errors/not-found');
const BadRequest = require('../middleware/errors/bad-request');
const messages = require('../middleware/errors/messages');

module.exports = {
    // возвращает всех пользователей
    getUserAll: (req, res, next) => {
        User.find({})
            .then((users) => res.json(users))
            .catch(next);
    },

    // возвращает пользователя по _id
    getUserId: (req, res, next) => {
        User.findById(req.params.id)
            .orFail(new NotFoundError(messages.getUserId.notFoundError))
            .then((user) => res.json(user))
            .catch(next);
    },

    // обновляет профиль
    putProfileUpdate: (req, res, next) => {
        const { name, about, userId } = req.body;

        User.findByIdAndUpdate(userId, { name, about }, { runValidators: true, new: true })
            .then((user) => res.json(user))
            .catch((err) => next(new BadRequest(err.message)));
    },

    // обновляет аватар
    putAvatarUpdate: (req, res, next) => {
        const { avatar, userId } = req.body;

        User.findByIdAndUpdate(userId, { avatar }, { runValidators: true, new: true })
            .then((user) => res.json(user))
            .catch((err) => next(new BadRequest(err.message)));
    },
};
