const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../assets/config');
const ErrorMessage = require('../assets/error-message');

module.exports = {
    // возвращает всех пользователей
    getUserAll: (req, res) => {
        User.find({})
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err));
    },

    // возвращает пользователя по _id
    getUserId: (req, res) => {
        User.findById(req.params.id)
            .orFail()
            .then(user => res.json(user))
            .catch(err => new ErrorMessage(err, 'getUserId', res));
    },

    // обновляет профиль
    putProfileUpdate: (req, res) => {
        const {name, about} = req.body;

        User.findByIdAndUpdate(req.user._id, {name, about}, { runValidators: true, new: true })
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    },

    // обновляет аватар
    putAvatarUpdate: (req, res) => {
        const {avatar} = req.body;

        User.findByIdAndUpdate(req.user._id, {avatar}, { runValidators: true, new: true })
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    },

    // создаёт пользователя
    postUser: (req, res) => {
        // Получаю все данные из запроса
        const {name, about, avatar, email, password} = req.body;

        // Сначала валидирую (что бы получить ошибки перед хешированием и отправкой)
        // Если все ок, хеширую пароль и отправляю на сервер
        User.validate({name, about, avatar, email, password})
            .then(() => bcrypt.hash(password, 10))
            .then(hash => User.create({name, about, avatar, email, password: hash}))
            .then(({_doc}) => {
                delete _doc.password;
                res.json(_doc);
            })
            .catch(err => new ErrorMessage(err, 'postUser', res));
    },

    login: (req, res) => {
        // Получаю авторизационные данные из запроса
        const {email, password} = req.body;

        User.findOne({email})
            .orFail()
            .select('+password')
            .then(user => {
                // сравниваем переданный пароль и хеш из базы
                return bcrypt.compare(password, user.password)
                     .then(matched => {
                         // хеши не совпали — отклоняем промис
                         if (!matched) return Promise.reject({name: 'Unauthorized'});
                         // аутентификация успешна
                         return user;
                     })
            })
            .then(user => {
                // создадим токен
                const token = jwt.sign(
                    {_id: user._id},
                    config.JWT_SECRET,
                    {expiresIn: '7d'});

                // записываем токен в cookie пользователю
                res.cookie('token', token, {
                    maxAge: 3600000 * 24 * 7,
                    httpOnly: true,
                    sameSite: true
                }).end(token);
                // В чек лесте написано зачем то возвращать токен в ответе
                // если почта и пароль верные, контроллер login возвращает созданный токен в ответе
            })
            .catch(err => new ErrorMessage(err, 'login', res));
    },
};
