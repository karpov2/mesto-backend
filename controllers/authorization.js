const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');
const Unauthorized = require('../middleware/errors/unauthorized');
const messages = require('../middleware/errors/messages');

module.exports = (req, res, next) => {
    // Получаю авторизационные данные из запроса
    const { email, password } = req.body;

    User.findOne({ email })
        .orFail(new Unauthorized(messages.authorization.unauthorized))
        .select('+password')
        // сравниваем переданный пароль и хеш из базы
        .then((user) => bcrypt.compare(password, user.password)
            .then((matched) => {
                // хеши не совпали — отклоняем промис
                if (!matched) throw new Unauthorized(messages.authorization.unauthorized);
                // аутентификация успешна
                return user;
            }))
        .then((user) => {
            // создадим токен
            const token = jwt.sign(
                { _id: user._id },
                config.JWT_SECRET,
                { expiresIn: '7d' },
            );

            // записываем токен в cookie пользователю
            res.cookie('token', token, {
                maxAge: 3600000 * 24 * 7,
                httpOnly: true,
                sameSite: true,
            });

            res.status(200).send({ message: messages.authorization.success });
        })
        .catch(next);
};
