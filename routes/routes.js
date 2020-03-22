const router = require('express').Router(); // Создали роутер
const auth = require('../middleware/auth');
const users = require('../controllers/users');
const cards = require('../controllers/cards');
const errorPage = require('../controllers/error');

router.post('/signin', users.login); // авторизация пользователя
router.post('/signup', users.postUser); // создание пользователя

router.use(auth);
console.log('После auth');
router.get('/users', users.getUserAll); // возвращает всех пользователей
router.get('/users/:userId', users.getUserId); // возвращает пользователя по _id
router.patch('/users/me', users.putProfileUpdate); // обновляет профиль
router.patch('/users/me/avatar', users.putAvatarUpdate); // обновляет аватар

router.get('/cards', cards.cardsGet); // возвращает все карточки
router.post('/cards', cards.cardPost); // создаёт карточку
router.delete('/cards/:cardId', cards.cardDelete); // удаляет карточку по идентификатору
router.put('/cards/:cardId/likes', cards.cardLikePut); // поставить лайк карточке
router.delete('/cards/:cardId/likes', cards.cardLikeDelete); // убрать лайк с карточки

router.get('*', errorPage);

module.exports = router;
