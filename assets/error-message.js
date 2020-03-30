module.exports = class ErrorMessage {
    constructor(err, fn, res) {
        this.errors(this[fn](err));
        this.error = err;

        this.messages(res);

    }

    errors(error) {
        this.status = error.status;
        this.message = error.message;
    }

    messages(res) {
        res.status(this.status).json({message: this.message, error: this.error});
    }

    cardLikeDelete(err) {
        let error = {};
        switch (err.name) {
            case 'CastError':
                error.status = 500;
                error.message = 'Произошла ошибка в удалении лайка карточки';
                break;
            case 'DocumentNotFoundError':
                error.status = 404;
                error.message = 'Не могу удалить лайк несуществующей карточки';
                break;
            default:
                error.status = 500;
                error.message = 'Ошибка сервера';
                break;
        }
        return error;
    }

    cardLikePut(err) {
        let error = {};
        switch (err.name) {
            case 'CastError':
                error.status = 500;
                error.message = 'Произошла ошибка в добавлении лайка карточки';
                break;
            case 'DocumentNotFoundError':
                error.status = 404;
                error.message = 'Не могу добавить лайк несуществующей карточки';
                break;
            default:
                error.status = 500;
                error.message = 'Ошибка сервера';
                break;
        }
        return error;
    }

    getUserId(err) {
        let error = {};
        switch (err.name) {
            case 'CastError':
                error.status = 500;
                error.message = 'Некорректный id пользователя';
                break;
            case 'DocumentNotFoundError':
                error.status = 404;
                error.message = 'Данного пользователя нет в базе';
                break;
            default:
                error.status = 500;
                error.message = 'Ошибка сервера';
                break;
        }
        return error;
    }

    postUser(err) {
        let error = {};
        switch (err.name) {
            case 'MongoError':
                error.status = 409;
                error.message = 'Произошел конфликт, такой email уже существует';
                break;
            case 'ValidationError':
                error.status = 500;
                error.message = 'Ошибка валидации формы';
                break;
            default:
                error.status = 500;
                error.message = 'Ошибка сервера';
                break;
        }
        return error;
    }

    login(err) {
        let error = {};
        switch (err.name) {
            case 'DocumentNotFoundError':
                error.status = 409;
                error.message = 'Произошла ошибка при авторизации, неверный email или пароль';
                break;
            case 'NoBcryptCompare':
                error.status = 500;
                error.message = 'Произошла ошибка при авторизации, неверный email или пароль';
                break;
            default:
                error.status = 500;
                error.message = 'Ошибка сервера';
                break;
        }
        return error;
    }

    cardsGet(err) {
        let error = {};
        switch (err.name) {
            case 'DocumentNotFoundError':
                error.status = 404;
                error.message = 'Произошла ошибка в выводе списка карточек';
                break;
            default:
                error.status = 500;
                error.message = 'Ошибка сервера';
                break;
        }
        return error;
    }

    cardPost(err) {
        let error = {};
        switch (err.name) {
            case 'DocumentNotFoundError':
                error.status = 404;
                error.message = 'Произошла ошибка в создании новой карточки';
                break;
            case 'ValidationError':
                error.status = 500;
                error.message = 'Ошибка валидации формы';
                break;
            default:
                error.status = 500;
                error.message = 'Ошибка сервера';
                break;
        }
        return error;
    }

    cardDelete(err) {
        let error = {};
        switch (err.name) {
            case 'CastError':
                error.status = 500;
                error.message = 'Произошла ошибка в удалении карточки';
                break;
            case 'DocumentNotFoundError':
                error.status = 404;
                error.message = 'Произошла ошибка в удалении карточки, данной карточки не существует';
                break;
            default:
                error.status = 500;
                error.message = 'Ошибка сервера';
                break;
        }
        return error;
    }
};
