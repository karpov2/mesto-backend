const router = require('express').Router();
const schemas = require('../middleware/schemas/cards');
const cards = require('../controllers/cards');

router.get('/', cards.cardsGet); // возвращает все карточки
router.post('/', schemas.cardPost, cards.cardPost); // создаёт карточку
router.delete('/:id', schemas.cardDelete, cards.cardDelete); // удаляет карточку по идентификатору
router.put('/:id/likes', schemas.cardLikePut, cards.cardLikePut); // поставить лайк карточке
router.delete('/:id/likes', schemas.cardLikePut, cards.cardLikeDelete); // убрать лайк с карточки

module.exports = router;
