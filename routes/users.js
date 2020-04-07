const router = require('express').Router();
const schemas = require('../middleware/schemas/users');
const users = require('../controllers/users');

router.get('/', users.getUserAll); // возвращает всех пользователей
router.get('/:id', schemas.getUserId, users.getUserId); // возвращает пользователя по _id
router.patch('/me', schemas.putProfileUpdate, users.putProfileUpdate); // обновляет профиль
router.patch('/me/avatar', schemas.putAvatarUpdate, users.putAvatarUpdate); // обновляет аватар

module.exports = router;
