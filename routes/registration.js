const router = require('express').Router();
const schemas = require('../middleware/schemas/registration');
const registration = require('../controllers/registration');

router.post('/', schemas.registration.bind(), registration); // создание пользователя

module.exports = router;
