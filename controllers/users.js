const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    // возвращает всех пользователей
    getUserAll: (req, res) => {
        User.find({})
            .then(users => res.send(users))
            .catch(err => res.status(500).send({ message: 'Произошла ошибка при выводе всех пользователей', error: err }));
    },

    // возвращает пользователя по _id
    getUserId: (req, res) => {
        User.findById(req.params.userId)
            .then(user => res.send(user))
            .catch(err => res.status(404).send({ message: 'Произошла ошибка при выводе пользователя', error: err }));
    },

    // обновляет профиль
    putProfileUpdate: (req, res) => {
        const {name, avatar} = req.body;
        const data = avatar ? {name, avatar} : {name};

        User.findByIdAndUpdate(req.user._id, data, { runValidators: true, new: true })
            .then(user => res.send(user))
            .catch(err => res.status(400).send({ message: 'Произошла ошибка при обновлении информации профиля', error: err }));
    },

    // обновляет аватар
    putAvatarUpdate: (req, res) => {
        const {avatar} = req.body;

        User.findByIdAndUpdate(req.user._id, {avatar}, { runValidators: true, new: true })
            .then(user => res.send(user))
            .catch(err => res.status(400).send({ message: 'Произошла ошибка при обновлении аватарки', error: err }));
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
            .then(user => res.send(user))
            .catch(err => res.status(400).send({
                message: 'Произошла ошибка при создании нового пользователя',
                error: err
            }));
    },

    login: (req, res) => {
        // Получаю авторизационные данные из запроса
        const {email, password} = req.body;
        const message = {
            error: 'Произошла ошибка при авторизации, неверный email или пароль',
            success: 'Авторизация прошла успешно'
        };

        User.findOne({email})
            .select('+password')
            .then(user => {
                // пользователь не найден — отклоняем промис
                // с ошибкой и переходим в блок catch
                if (!user) return Promise.reject(message.error);

                // сравниваем переданный пароль и хеш из базы
                return bcrypt.compare(password, user.password)
                     .then(matched => {
                         // хеши не совпали — отклоняем промис
                         console.log(matched);
                         if (!matched) return Promise.reject(message.error);

                         // аутентификация успешна
                         return user;
                     });
            })
            .then(user => {
                const { NODE_ENV, JWT_SECRET } = process.env;
                // создадим токен
                const token = jwt.sign(
                    {_id: user._id},
                    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
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
            .catch(err => res.status(401).send({message: err}));
    },
};
