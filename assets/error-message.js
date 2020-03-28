module.exports.error = (props, res) => {
    const model = props.message.match(/"(\w+)"$/)[1];

    for (let name in error[model] || error) if (name === props.name) {
        const {message, status} = error[model][name][props.path || Object.keys(props.query)];
        res.status(status).json({message});
        return;
    }


};

const error = {
    user: {
        // name ошибки
        // Данные не соответствуют модели
        CastError: {
            _id: {
                message: 'Некорректный id пользователя',
                status: 500
            },
            avatar: {
                message: 'Произошла ошибка при обновлении информации профиля',
                status: 500
            }
        },
        // name ошибки
        // Данные соответствуют модели
        DocumentNotFoundError: {
            _id: {
                message: 'Данного пользователя нет в базе',
                status: 404
            }
        }
    },
    card: {}
};
