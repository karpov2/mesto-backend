const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequest = require('../middleware/errors/bad-request');

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
        .catch((err) => next(new BadRequest(err.message)));
};
