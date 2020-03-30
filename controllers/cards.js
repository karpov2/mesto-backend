const Card = require('../models/card');
const ErrorMessage = require('../assets/error-message');

module.exports = {
    // возвращает все карточки
    cardsGet: (req, res) => {
        Card.find({})
            .then(cards => res.send(cards))
            .catch(err => new ErrorMessage(err, 'cardsGet', res));
    },

    // создаёт карточку
    cardPost: (req, res) => {
        const {name, link} = req.body;
        Card.create({name, link, owner: req.user._id})
            .then(card => res.send(card))
            .catch(err => new ErrorMessage(err, 'cardPost', res));
    },

    // удаляет карточку по идентификатору
    cardDelete: (req, res) => {
        Card.findOneAndRemove({
            _id: req.params.id,
            owner: req.user._id
        })
        .orFail()
        .then(card => {
            if (!card) return Promise.reject({name: 'DocumentNotFoundError'});
            res.send(card)
        })
        .catch(err => new ErrorMessage(err, 'cardDelete', res));
    },

    // поставить лайк карточке
    cardLikePut: (req, res) => {
        Card.findByIdAndUpdate(
            req.params.id,
            { $addToSet: {likes: req.user._id} }, // добавить _id в массив, если его там нет
            { new: true }
        )
        .orFail()
        .then(card => res.send(card))
        .catch(err => new ErrorMessage(err, 'cardLikePut', res));
    },

    // убрать лайк с карточки
    cardLikeDelete: (req, res) => {
        Card.findByIdAndUpdate(
            req.params.id,
            { $pull: { likes: req.user._id } }, // убрать _id из массива
            { new: true }
        )
        .orFail()
        .then(card => res.send(card))
        .catch(err => new ErrorMessage(err, 'cardLikeDelete', res));
    },
};
