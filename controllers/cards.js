const Card = require('../models/card');

module.exports = {
    // возвращает все карточки
    cardsGet: (req, res) => {
        Card.find({})
            .then(cards => res.send(cards))
            .catch(err => res.status(500).json({ message: 'Произошла ошибка в выводе списка карточек', error: err }));
    },

    // создаёт карточку
    cardPost: (req, res) => {
        const {name, link} = req.body;
        Card.create({name, link, owner: req.user._id})
            .then(card => res.send(card))
            .catch(err => res.status(500).json({ message: 'Произошла ошибка в создании новой карточки', error: err }));
    },

    // удаляет карточку по идентификатору
    cardDelete: (req, res) => {
        Card.findOneAndRemove({
            _id: req.params.id,
            owner: req.user._id
        })
        .then(card => {
            if (!card) return Promise.reject();
            res.send(card)
        })
        .catch(err => res.status(err ? 404 : 403).json({
            message: 'Произошла ошибка в удалении карточки',
            error: err
        }));
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
        .catch(err => res.status(500).json({ message: 'Произошла ошибка в добавлении лайка карточки', error: err }));
    },

    // убрать лайк с карточки
    cardLikeDelete: (req, res) => {
        Card.findByIdAndUpdate(
            req.params.id,
            { $pull: { likes: req.user._id } }, // убрать _id из массива
            { new: true }
        )
        .then(card => res.send(card))
        .catch(err => res.status(500).json({ message: 'Произошла ошибка в удалении лайка карточки', error: err }));
    },
};
