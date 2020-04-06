const {
    NODE_ENV, JWT_SECRET, PORT, MONGODB,
} = process.env;

module.exports = {
    // Порт который слушает сервер
    PORT: PORT || 3000,
    // Ссылка на базу данных
    DATABASE: 'mongodb://localhost:27017/mestodb',
    // Секретный ключ в зависимости от сборки
    JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};
