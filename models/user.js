const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    name: { // имя пользователя
        type: String,
        required: [true, 'Необходимо указать имя'],
        minlength: 2,
        maxlength: 30
    },
    about: { // информация о пользователе
        type: String,
        required: [true, 'Необходимо указать дополнительную информацию'],
        minlength: 2,
        maxlength: 30
    },
    avatar: { // ссылка на аватарку
        type: String,
        required: [true, 'Необходимо загрузить аватар'],
        validate: {
            validator: link => /^https?:\/\/\S+(?:\.[a-zA-Z]{2,8})\/\S+(?:jpg|jpeg|png)$/.test(link),
            message: props => `Не правильно указана ссылка на картинку ${props.value}`
        }
    },
    email: {
        type: String,
        required: [true, 'Необходимо указать почту'],
        unique: true,
        validate: {
            validator: email => isEmail(email),
            message: props => `Неправильный формат почты ${props.value}`
        }
    },
    password: {
        type: String,
        required: [true, 'Необходимо указать пароль'],
        minlength: 8,
        // Так по умлочанию хеш пароля пользователя не будет возвращаться из базы.
        select: false
    }
});

module.exports = mongoose.model('user', userSchema);
