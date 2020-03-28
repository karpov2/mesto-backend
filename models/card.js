const mongoose = require('mongoose');
const {isURL} = require('validator');

const cardSchema = new mongoose.Schema({
    name: { // имя карточки
        type: String,
        required: [true, 'Необходимо указать название карточки'],
        minlength: 2,
        maxlength: 30
    },
    link: { // ссылка на картинку
        type: String,
        required: [true, 'Необходимо указать ссылку на изображение'],
        validate: {
            validator: (link) => isURL(link),
            message: props => `Не правильно указана ссылка на картинку ${props.value}`
        }
    },
    owner: { // ссылка на модель автора карточки
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Необходимо указать id автора']
    },
    likes: [{ // список лайкнувших пост пользователей
        type: mongoose.Schema.Types.ObjectId,
        default: [],
    }],
    createdAt: { // дата создания
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('card', cardSchema);
