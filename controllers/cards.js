const Card = require('../models/card');
const NotFoundError = require('../middleware/errors/not-found');
const BadRequest = require('../middleware/errors/bad-request');
const Unauthorized = require('../middleware/errors/unauthorized');
const messages = require('../middleware/errors/messages');

module.exports = {
    // возвращает все карточки
    cardsGet: (req, res, next) => {
        Card.find({})
            .then((cards) => res.send(cards))
            .catch(next);
    },

    // создаёт карточку
    cardPost: (req, res, next) => {
        const { name, link, userId } = req.body;
        Card.create({ name, link, owner: userId })
            .then((card) => res.send(card))
            .catch((err) => next(new BadRequest(err.message)));
    },

    // удаляет карточку по идентификатору
    cardDelete: (req, res, next) => {
        Card.findById(req.params.id)
            .orFail(new NotFoundError(messages.cardDelete.notFoundError))
            .then((card) => {
                if (!card) throw new NotFoundError(messages.cardDelete.notFoundError);
                if (!card.owner.equals(req.body.userId)) {
                    throw new Unauthorized(messages.cardDelete.unauthorized);
                }

                return Card.deleteOne(card).then(() => res.send(card));
            })
            .catch(next);
    },

    // поставить лайк карточке
    cardLikePut: (req, res, next) => {
        Card.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likes: req.body.userId } }, // добавить _id в массив, если его там нет
            { new: true },
        )
            .orFail(new NotFoundError(messages.cardLikePut.notFoundError))
            .then((card) => res.send(card))
            .catch((err) => (err.name === 'CastError'
                ? next(new NotFoundError(messages.cardLikePut.castError)) : next));
    },

    // убрать лайк с карточки
    cardLikeDelete: (req, res, next) => {
        Card.findByIdAndUpdate(
            req.params.id,
            { $pull: { likes: req.body.userId } }, // убрать _id из массива
            { new: true },
        )
            .orFail(new NotFoundError(messages.cardLikeDelete.notFoundError))
            .then((card) => res.send(card))
            .catch((err) => (err.name === 'CastError'
                ? next(new NotFoundError(messages.cardLikeDelete.castError)) : next));
    },
};
