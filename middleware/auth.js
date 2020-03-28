const jwt = require('jsonwebtoken');
const config = require('../assets/config');
const User = require('../models/user');

const message = {
    errorToken: 'Необходима авторизация',
    errorUser: 'Пользователь удален, необходимо снова зарегистрироваться',
};

module.exports = (req, res, next) => {
    // Достаем токен из кукана)
    const { token } = req.cookies;

    if (!token) return res.status(401).json({message: message.errorToken});

    let payload;
    try {
        // попытаемся верифицировать токен
        payload = jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({message: message.errorToken});
    }

    req.user = payload; // записываем пейлоуд в объект запроса
    User.findById(req.user._id)
        .orFail()
        .then(() => next())
        .catch(() => res.json({message: message.errorUser}));
};
