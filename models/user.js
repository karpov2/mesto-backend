const mongoose = require('mongoose');
const {isEmail, isURL} = require('validator');

const userSchema = new mongoose.Schema({
    name: { // имя пользователя
        type: String,
        required: [true, 'Необходимо указать имя'],
        minlength: [2, 'Имя пользователя должно содержать от 2 до 30 символов'],
        maxlength: [30, 'Имя пользователя должно содержать от 2 до 30 символов']
    },
    about: { // информация о пользователе
        type: String,
        required: [true, 'Необходимо указать дополнительную информацию'],
        minlength: [2, 'Информация о пользователе должна содержать от 2 до 30 символов'],
        maxlength: [30, 'Информация о пользователе должна содержать от 2 до 30 символов']
    },
    avatar: { // ссылка на аватарку
        type: String,
        required: [true, 'Необходимо загрузить аватар'],
        validate: {
            validator: link => isURL(link),
            message: props => `Не правильно указана ссылка на картинку - ${props.value}`
        }
    },
    email: {
        type: String,
        required: [true, 'Необходимо указать почту'],
        unique: true,
        validate: {
            validator: email => isEmail(email),
            message: props => `Неправильный формат почты - ${props.value}`
        }
    },
    password: {
        type: String,
        required: [true, 'Необходимо указать пароль'],
        minlength: [8, 'Пароль должен содержать более 8 символов'],
        // Так по умлочанию хеш пароля пользователя не будет возвращаться из базы.
        select: false
    }
});

module.exports = mongoose.model('user', userSchema);
