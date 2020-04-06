const jwt = require('jsonwebtoken');
const config = require('../assets/config');
const User = require('../models/user');
const Unauthorized = require('./errors/unauthorized');
const NotFoundError = require('./errors/not-found');
const messages = require('./errors/messages');

module.exports = (req, res, next) => {
    // Достаем токен из кукана)
    const { token } = req.cookies;

    const errors = new Unauthorized(messages.auth.unauthorized);

    if (!token) throw next(errors);

    let payload;
    try {
        // попытаемся верифицировать токен
        payload = jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
        throw next(errors);
    }

    req.body.userId = payload._id; // записываем пейлоуд в объект запроса
    return User.findById(req.body.userId)
        .orFail(new NotFoundError(messages.auth.notFoundError))
        .then(() => next())
        .catch(next);
};
