const jwt = require('jsonwebtoken');

const message = {
    error: 'Необходима авторизация'
};

module.exports = (req, res, next) => {
    // Достаем токен из кукана)
    const { token } = req.cookies;

    if (!token) return res.status(401).send(message.error);

    let payload;
    try {
        const { NODE_ENV, JWT_SECRET } = process.env;
        // попытаемся верифицировать токен
        payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (error) {
        return res.status(401).send(message.error);
    }

    req.user = payload; // записываем пейлоуд в объект запроса
    next();
};
