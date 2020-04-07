const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequest = require('../middleware/errors/bad-request');
const messages = require('../middleware/errors/messages');

// создаёт пользователя
module.exports = (req, res, next) => {
    // Получаю все данные из запроса
    const {
        name, about, avatar, email, password,
    } = req.body;

    bcrypt.hash(password, 10)
        .then((hash) => User.create({
            name, about, avatar, email, password: hash,
        }))
        .then(({ _doc }) => {
            const user = _doc;
            delete user.password;
            res.json(user);
        })
        .catch(() => next(new BadRequest(messages.registration.mongoError)));
};
