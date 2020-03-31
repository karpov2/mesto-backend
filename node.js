require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routes/routes');
const config = require('./assets/config');

mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {
    console.info('Database connected');

    const app = express();
    app.use(cookieParser()); // подключаем парсер кук как мидлвэр
    app.use(bodyParser.json()); // parse application/json
    app.use(router);

    app.listen(config.PORT, () => {
        console.info(`App listening on port ${config.PORT}`);
    });
})
.catch(error => {
    console.error('Database connected Error: ', error);
});
