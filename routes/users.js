const router = require('express').Router();
const schemas = require('../middleware/schemas/users');
const users = require('../controllers/users');

router.get('/', users.getUserAll); // возвращает всех пользователей
router.get('/:id', schemas.getUserId.bind(), users.getUserId); // возвращает пользователя по _id
router.patch('/me', schemas.putProfileUpdate.bind(), users.putProfileUpdate); // обновляет профиль
router.patch('/me/avatar', schemas.putAvatarUpdate.bind(), users.putAvatarUpdate); // обновляет аватар

module.exports = router;
