const jwt = require('jsonwebtoken');
const config = require('../assets/config');
const User = require('../models/user');
const ErrorMessage = require('../assets/error-message');

module.exports = (req, res, next) => {
    // Достаем токен из кукана)
    const { token } = req.cookies;

    const errors = (err) => {
        new ErrorMessage(err, 'auth', res)
    };

    if (!token) return errors({name: 'Unauthorized'});

    let payload;
    try {
        // попытаемся верифицировать токен
        payload = jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
        return errors({name: 'Unauthorized'});
    }

    req.user = payload; // записываем пейлоуд в объект запроса
    User.findById(req.user._id)
        .orFail()
        .then(() => next())
        .catch(err => errors(err));
};
