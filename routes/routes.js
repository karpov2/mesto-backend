const router = require('express').Router();
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('../middleware/log/logger');
// Миделверы
const auth = require('../middleware/auth');
const allError = require('../middleware/errors/all-error');
// Роутеры
const registration = require('./registration');
const authorization = require('./authorization');
const users = require('./users');
const cards = require('./cards');
const errorPage = require('./error');

router.use(requestLogger); // подключаем логгер запросов

router.get('/crash-test', () => {
    setTimeout(() => {
        throw new Error('Сервер сейчас упадёт');
    }, 0);
});

router.use('/signin', authorization); // авторизация пользователя
router.use('/signup', registration); // создание пользователя

router.use(auth); // Проверка токена (на права доступа)
router.use('/users', users);
router.use('/cards', cards);
router.all('*', errorPage);

router.use(errorLogger); // подключаем логгер ошибок

router.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик ошибок
router.use(allError);

module.exports = router;
